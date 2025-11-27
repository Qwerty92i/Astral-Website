const http = require('http');
http.get('http://127.0.0.1:8090/api/health', res => {
  console.log('status', res.statusCode);
  let body='';
  res.on('data', c=> body+=c);
  res.on('end', ()=> console.log('body', body));
}).on('error', e=> console.error('err', e));
