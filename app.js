const http = require('http');

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  // Intentional bug: this will crash the server
  throw new Error('Simulated deployment failure!');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
