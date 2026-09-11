const express = require('express');
const app = express();

const PORT = process.env.PORT || 3500;

// Intentional bug: app crashes immediately on startup (simulated deployment failure)
throw new Error('Simulated critical failure in deployment version 5.0!');

app.get('/', (req, res) => {
  res.status(200).json({ message: 'This will never run' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
