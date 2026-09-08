const http = require('http');

const PORT = process.env.PORT || 3500;
const HOST = 'localhost';

function checkEndpoint(path) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: HOST, port: PORT, path, method: 'GET' },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve({ path, statusCode: res.statusCode, body: data });
          } else {
            reject(new Error(`${path} returned status ${res.statusCode}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function runTests() {
  console.log('Running automated tests...\n');

  try {
    const home = await checkEndpoint('/');
    console.log(`PASSED: GET / -> ${home.statusCode}`);

    const health = await checkEndpoint('/health');
    console.log(`PASSED: GET /health -> ${health.statusCode}`);

    const info = await checkEndpoint('/info');
    console.log(`PASSED: GET /info -> ${info.statusCode}`);

    console.log('\nAll tests passed successfully.');
    process.exit(0);
  } catch (err) {
    console.error(`\nTEST FAILED: ${err.message}`);
    process.exit(1);
  }
}

runTests();
