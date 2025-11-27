const http = require('http');
const data = JSON.stringify({ owner:'alice@example.com', title:'Dossier Alice' });
const options = { hostname: '127.0.0.1', port: 8090, path: '/api/dossiers', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } };
const req = http.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', ()=>{ console.log('status', res.statusCode); console.log('body', body); });
});
req.on('error', e => console.error('err', e));
req.write(data);
req.end();
