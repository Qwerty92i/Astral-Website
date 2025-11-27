import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, 'users.json');

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

const messagesFilePath = path.join(__dirname, 'messages.json');

if (!fs.existsSync(messagesFilePath)) {
    fs.writeFileSync(messagesFilePath, JSON.stringify([], null, 2));
    console.log('✅ Fichier messages.json créé');
}

function readMessages() {
    const data = fs.readFileSync(messagesFilePath, 'utf-8');
    return JSON.parse(data);
}

function writeMessages(messages) {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
}

const threadsFilePath = path.join(__dirname, 'threads.json');

if (!fs.existsSync(threadsFilePath)) {
    fs.writeFileSync(threadsFilePath, JSON.stringify([], null, 2));
    console.log('✅ Fichier threads.json créé');
}

function readThreads(){
    const data = fs.readFileSync(threadsFilePath, 'utf-8');
    return JSON.parse(data);
}

function writeThreads(threads){
    fs.writeFileSync(threadsFilePath, JSON.stringify(threads, null, 2));
}

// dossiers (user folders) - stored separately as requested
const dossiersFilePath = path.join(__dirname, 'dossiers.json');
if (!fs.existsSync(dossiersFilePath)) {
    fs.writeFileSync(dossiersFilePath, JSON.stringify([], null, 2));
    console.log('✅ Fichier dossiers.json créé');
}
function readDossiers(){
    const data = fs.readFileSync(dossiersFilePath, 'utf-8');
    return JSON.parse(data);
}
function writeDossiers(dossiers){
    fs.writeFileSync(dossiersFilePath, JSON.stringify(dossiers, null, 2));
}

function contentTypeFromExt(ext){
    const map = {
        '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.json':'application/json',
        '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml', '.ico':'image/x-icon'
    };
    return map[ext.toLowerCase()] || 'application/octet-stream';
}

// simple server-side audit log to help debug endpoint hits
const serverLogPath = path.join(__dirname, 'server.log');
function appendLog(line){
    try{
        const ts = new Date().toISOString();
        fs.appendFileSync(serverLogPath, `[${ts}] ${line}\n`);
    }catch(e){ console.warn('Impossible d\'écrire server.log', e); }
}

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    try {
        // Health
        if (pathname === '/api/health' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'ok', message: '🚀 Serveur actif' }));
            return;
        }

        // Register / Login / Users (existing)
        if (pathname === '/api/register' && req.method === 'POST') {
            const body = await parseJSON(req);
            const { email, password } = body;

            if (!email || !password) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Email et mot de passe requis.' }));
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Format d\'email invalide.' }));
                return;
            }

            const users = readUsers();

            if (users.some(user => user.email === email)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
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

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Compte créé avec succès!', userId: newUser.id }));
            return;
        }

        if (pathname === '/api/login' && req.method === 'POST') {
            const body = await parseJSON(req);
            const { email, password } = body;

            if (!email || !password) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Email et mot de passe requis.' }));
                return;
            }

            const users = readUsers();

            const user = users.find(u => u.email === email);

            if (!user) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Identifiants incorrects.' }));
                return;
            }

            const isPasswordValid = verifyPassword(password, user.password);

            if (!isPasswordValid) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Identifiants incorrects.' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Connexion réussie!', email: user.email, userId: user.id }));
            return;
        }

        if (pathname === '/api/users' && req.method === 'GET') {
            const users = readUsers();
            const userList = users.map(u => ({ email: u.email, id: u.id, created_at: u.created_at }));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(userList));
            return;
        }

        // Messages API
        if (pathname === '/api/messages' && req.method === 'GET') {
            const messages = readMessages();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(messages));
            return;
        }

        if (pathname === '/api/messages' && req.method === 'POST') {
            const body = await parseJSON(req);
            const { email, message } = body;
            if (!email || !message) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Email et message requis.' }));
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Format d\'email invalide.' }));
                return;
            }

            const messages = readMessages();
            const newMsg = { id: Date.now() + Math.floor(Math.random()*999), email, message, date: new Date().toISOString() };
            messages.push(newMsg);
            writeMessages(messages);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newMsg));
            return;
        }

        // Threads API
        // GET /api/threads
        if (pathname === '/api/threads' && req.method === 'GET') {
            const threads = readThreads();
            // return threads without messages (lightweight)
            const list = threads.map(t => ({ id: t.id, title: t.title, owner: t.owner, created_at: t.created_at }));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(list));
            return;
        }

        // POST /api/threads { title, owner }
        if (pathname === '/api/threads' && req.method === 'POST') {
            const body = await parseJSON(req);
            const { title, owner } = body;
            if (!title || !owner) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Title et owner requis.' }));
                return;
            }

            // limit: one thread per owner
            const threads = readThreads();
            if (threads.some(t => t.owner === owner)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Chaque utilisateur ne peut créer qu\'une seule discussion.' }));
                return;
            }

            const newThread = { id: Date.now() + Math.floor(Math.random()*999), title, owner, created_at: new Date().toISOString(), messages: [] };
            threads.push(newThread);
            writeThreads(threads);
            // Also register dossier entry in dossiers.json so creations are tracked separately
            try{
                const dossiers = readDossiers();
                // enforce one dossier per owner (if a dossier already exists for this owner, skip)
                if (!dossiers.some(d=>d.owner===owner)){
                    const d = { id: newThread.id, title: newThread.title, owner: newThread.owner, created_at: newThread.created_at };
                    dossiers.push(d);
                    writeDossiers(dossiers);
                }
            }catch(e){ console.warn('Impossible d\'écrire dossiers.json', e); }

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newThread));
            return;
        }

        // Dossiers API (separate listing of user folders)
        if (pathname === '/api/dossiers' && req.method === 'GET') {
            const dossiers = readDossiers();
            const list = dossiers.map(d => ({ id: d.id, title: d.title, owner: d.owner, target: d.target, created_at: d.created_at }));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(list));
            return;
        }

        if (pathname === '/api/dossiers' && req.method === 'POST') {
            const body = await parseJSON(req);
            const { title, owner, target } = body;
            appendLog(`POST /api/dossiers body=${JSON.stringify(body)}`);
            if (!owner || (!title && !target)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'owner et (title ou target) requis.' }));
                return;
            }
            const dossiers = readDossiers();
            // if target provided, ensure the same owner cannot create multiple dossiers for the same target
            if (target) {
                if (dossiers.some(d => d.owner === owner && d.target === target)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Vous avez déjà créé un dossier pour cette personne.' }));
                    return;
                }
            } else {
                // no target: ensure owner has at most one generic dossier
                if (dossiers.some(d => d.owner === owner && !d.target)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Chaque utilisateur ne peut créer qu\'un dossier générique.' }));
                    return;
                }
            }

            const newD = { id: Date.now() + Math.floor(Math.random()*999), title: title||null, owner, target: target||null, created_at: new Date().toISOString() };
            dossiers.push(newD);
            writeDossiers(dossiers);
            appendLog(`CREATED dossier id=${newD.id} owner=${newD.owner} target=${newD.target}`);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newD));
            return;
        }

        // GET /api/threads/:id/messages
        if (pathname.startsWith('/api/threads/') && req.method === 'GET') {
            const parts = pathname.split('/').filter(Boolean); // ['api','threads',':id','messages'?]
            const id = Number(parts[2]);
            if (!id) { res.writeHead(400, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ message: 'ID invalide' })); return; }
            const threads = readThreads();
            const thread = threads.find(t => Number(t.id) === id);
            if (!thread) { res.writeHead(404, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ message: 'Discussion introuvable' })); return; }
            // return messages
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(thread.messages || []));
            return;
        }

        // POST /api/threads/:id/messages { email, content }
        if (pathname.startsWith('/api/threads/') && pathname.endsWith('/messages') && req.method === 'POST') {
            const parts = pathname.split('/').filter(Boolean);
            const id = Number(parts[2]);
            if (!id) { res.writeHead(400, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ message: 'ID invalide' })); return; }
            const body = await parseJSON(req);
            const { email, content } = body;
            if (!email || !content) { res.writeHead(400, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ message: 'Email et content requis' })); return; }

            const threads = readThreads();
            const thread = threads.find(t => Number(t.id) === id);
            if (!thread) { res.writeHead(404, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ message: 'Discussion introuvable' })); return; }

            const msg = { id: Date.now() + Math.floor(Math.random()*999), email, content, date: new Date().toISOString() };
            thread.messages = thread.messages || [];
            thread.messages.push(msg);
            writeThreads(threads);
            appendLog(`POST /api/threads/${id}/messages email=${msg.email} id=${msg.id}`);
            // Also append a record to messages.json linking to this dossier/thread id
            try{
                const messages = readMessages();
                const msgEntry = { id: msg.id, dossierId: id, email: msg.email, message: msg.content, date: msg.date };
                messages.push(msgEntry);
                writeMessages(messages);
                appendLog(`APPENDED to messages.json id=${msgEntry.id} dossierId=${id}`);
            }catch(e){ console.warn('Impossible d\'écrire messages.json', e); appendLog(`ERROR writing messages.json: ${e && e.message}`); }

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(msg));
            return;
        }

        // DELETE single message by id: /api/messages/:id
        if (pathname.startsWith('/api/messages/') && req.method === 'DELETE') {
            const parts = pathname.split('/').filter(Boolean); // ['api','messages','id']
            const idStr = parts[2];
            const id = Number(idStr);
            if (!id) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'ID invalide' }));
                return;
            }
            const messages = readMessages();
            const remaining = messages.filter(m => Number(m.id) !== id);
            writeMessages(remaining);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Supprimé' }));
            return;
        }

        // DELETE all messages
        if (pathname === '/api/messages' && req.method === 'DELETE') {
            writeMessages([]);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Tous les messages ont été supprimés' }));
            return;
        }

        // Serve static files from project root
        let safePath = pathname === '/' ? '/Directory/forum.html' : pathname;
        // prevent directory traversal
        safePath = path.normalize(safePath).replace(/^\.+/, '');
        const filePath = path.join(__dirname, safePath);

        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath);
            const type = contentTypeFromExt(ext);
            res.writeHead(200, { 'Content-Type': type });
            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
            return;
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route non trouvée' }));

    } catch (error) {
        console.error('❌ Erreur:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Erreur serveur' }));
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    console.log(`📁 Fichier des utilisateurs: ${usersFilePath}`);
    console.log(`📊 Endpoint health check: http://localhost:${PORT}/api/health`);
});

