const http = require('http');

const PORT = process.env.PORT || 3500;

console.log('Running basic test...');

const req = http.request({
  hostname: 'localhost',
  port: PORT,
  path: '/',
  method: 'GET'
}, (res) => {
  if (res.statusCode === 200) {
    console.log('Test PASSED: Server responded with status 200');
    process.exit(0);
  } else {
    console.log('Test FAILED: Unexpected status code', res.statusCode);
    process.exit(1);
  }
});

req.on('error', (e) => {
  console.log('Test FAILED: Could not connect to server -', e.message);
  process.exit(1);
});

req.end();
