const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

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

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
