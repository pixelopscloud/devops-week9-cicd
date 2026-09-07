const http = require('http');

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from DevOps Week 9 CI/CD Pipeline! Version 2.0 - UPDATED!\n');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
