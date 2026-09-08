const express = require('express');
const app = express();

const PORT = process.env.PORT || 3500;
const APP_VERSION = '1.0.0';

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to DevOps Week 9 CI/CD Pipeline App',
    version: APP_VERSION,
    status: 'running'
  });
});

// Health check route — used by automated tests and monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Info route — useful to verify which version is deployed
app.get('/info', (req, res) => {
  res.status(200).json({
    app: 'devops-week9-app',
    version: APP_VERSION,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Start server only if this file is run directly (not during tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
