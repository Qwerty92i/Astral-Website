const res = await fetch('http://127.0.0.1:8090/api/health');
console.log('status', res.status);
const body = await res.text();
console.log('body', body);
