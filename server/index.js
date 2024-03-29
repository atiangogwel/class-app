const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3005;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
