import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const PORT = 3000;

// Path to users file - using the GitHub network path
const usersFilePath = '\\\\srv-dc\\mcubier$\\Documents\\GitHub\\Astral-Website\\users.json';

// Initialize users file if it doesn't exist
if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
    console.log('✅ Fichier users.json créé sur le serveur réseau');
}

// Helper functions for password hashing
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function verifyPassword(password, hash) {
    return hashPassword(password) === hash;
}

// Read users
function readUsers() {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
}

// Write users
function writeUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Helper to parse JSON body
async function parseJSON(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(e);
            }
        });
    });
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    try {
        // Health check
        if (pathname === '/api/health' && req.method === 'GET') {
            res.writeHead(200);
            res.end(JSON.stringify({ status: 'ok', message: '🚀 Serveur actif' }));
            return;
        }

        // Register
        if (pathname === '/api/register' && req.method === 'POST') {
            const body = await parseJSON(req);
            const { email, password } = body;

            if (!email || !password) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Email et mot de passe requis.' }));
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Format d\'email invalide.' }));
                return;
            }

            const users = readUsers();

            // Check if user already exists
            if (users.some(user => user.email === email)) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Cet email est déjà utilisé.' }));
                return;
            }

            // Hash the password
            const hashedPassword = hashPassword(password);

            // Add new user
            const newUser = {
                id: Date.now(),
                email,
                password: hashedPassword,
                created_at: new Date().toISOString()
            };

            users.push(newUser);
            writeUsers(users);

            res.writeHead(201);
            res.end(JSON.stringify({ message: 'Compte créé avec succès!', userId: newUser.id }));
            return;
        }

        // Login
        if (pathname === '/api/login' && req.method === 'POST') {
            const body = await parseJSON(req);
            const { email, password } = body;

            if (!email || !password) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Email et mot de passe requis.' }));
                return;
            }

            const users = readUsers();

            // Find user by email
            const user = users.find(u => u.email === email);

            if (!user) {
                res.writeHead(401);
                res.end(JSON.stringify({ message: 'Identifiants incorrects.' }));
                return;
            }

            // Compare passwords
            const isPasswordValid = verifyPassword(password, user.password);

            if (!isPasswordValid) {
                res.writeHead(401);
                res.end(JSON.stringify({ message: 'Identifiants incorrects.' }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Connexion réussie!', email: user.email, userId: user.id }));
            return;
        }

        // Get all users
        if (pathname === '/api/users' && req.method === 'GET') {
            const users = readUsers();
            const userList = users.map(u => ({ email: u.email, id: u.id, created_at: u.created_at }));
            res.writeHead(200);
            res.end(JSON.stringify(userList));
            return;
        }

        // 404
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route non trouvée' }));

    } catch (error) {
        console.error('❌ Erreur:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ message: 'Erreur serveur' }));
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    console.log(`📁 Fichier des utilisateurs: ${usersFilePath}`);
    console.log(`📊 Endpoint health check: http://localhost:${PORT}/api/health`);
});

