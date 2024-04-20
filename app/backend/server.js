// backend/server.js

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

// Define routes
app.get('/', (req, res) => {
    res.send('Hello from Node.js server!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://myapp:${port}`);
});
