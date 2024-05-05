const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = express();
const httpPort = 5000;
const httpsPort = 4443;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve static files from the 'src' directory
app.use('/src', express.static(path.join(__dirname, '..', 'src')));

//register route
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

// route for /logout
app.get('/signout', (req, res) => {
  // Redirect to the login page
  res.redirect('/login');
});

// HTTP server
const httpServer = http.createServer(app);
httpServer.listen(httpPort, () => {
  console.log(`HTTP Server started on port ${httpPort}`);
});

// HTTPS server
const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

const httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS Server started on port ${httpsPort}`);
});
