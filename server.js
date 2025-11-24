import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const PORT = 3000;

const usersFilePath = '\\\\srv-dc\\mcubier$\\Documents\\GitHub\\Astral-Website\\users.json';

if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
    console.log('✅ Fichier users.json créé sur le serveur réseau');
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function verifyPassword(password, hash) {
    return hashPassword(password) === hash;
}

function readUsers() {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

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

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    try {
        if (pathname === '/api/health' && req.method === 'GET') {
            res.writeHead(200);
            res.end(JSON.stringify({ status: 'ok', message: '🚀 Serveur actif' }));
            return;
        }

        if (pathname === '/api/register' && req.method === 'POST') {
            const body = await parseJSON(req);
            const { email, password } = body;

            if (!email || !password) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Email et mot de passe requis.' }));
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Format d\'email invalide.' }));
                return;
            }

            const users = readUsers();

            if (users.some(user => user.email === email)) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Cet email est déjà utilisé.' }));
                return;
            }

            const hashedPassword = hashPassword(password);

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

        if (pathname === '/api/login' && req.method === 'POST') {
            const body = await parseJSON(req);
            const { email, password } = body;

            if (!email || !password) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Email et mot de passe requis.' }));
                return;
            }

            const users = readUsers();

            const user = users.find(u => u.email === email);

            if (!user) {
                res.writeHead(401);
                res.end(JSON.stringify({ message: 'Identifiants incorrects.' }));
                return;
            }

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

        if (pathname === '/api/users' && req.method === 'GET') {
            const users = readUsers();
            const userList = users.map(u => ({ email: u.email, id: u.id, created_at: u.created_at }));
            res.writeHead(200);
            res.end(JSON.stringify(userList));
            return;
        }

        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route non trouvée' }));

    } catch (error) {
        console.error('❌ Erreur:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ message: 'Erreur serveur' }));
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    console.log(`📁 Fichier des utilisateurs: ${usersFilePath}`);
    console.log(`📊 Endpoint health check: http://localhost:${PORT}/api/health`);
});

