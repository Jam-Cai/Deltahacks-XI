const express = require('express');
const cors = require('cors');
const next = require('next');
const mongoose = require('mongoose'); // Fixed typo
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
const PORT = process.env.PORT || 3000;

// Correct MongoDB URI
mongoose.connect(
  'mongodb+srv://jamescai123123:NDZgEnDAURrtVWO8@b-audit.pah9i.mongodb.net/?retryWrites=true&w=majority&appName=b-audit',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Middleware
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/results', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/makeCall', async (req, res) => {
  res.send('Make Call API'); // Placeholder response
});

app.post('/api/analysis', async (req, res) => {
  res.send('Analysis API'); // Placeholder response
});

// Uncomment the Next.js integration when needed
// nextApp.prepare().then(() => {
//   app.get('*', (req, res) => {
//     return handle(req, res);
//   });
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});