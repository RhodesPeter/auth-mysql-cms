const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const port = 3000;

// Initialize routes
routes(app);

// define 'Pug' as the templating engine
app.set('view engine', 'pug');

// Serve all files in the 'dist' folder
app.use('/', express.static(path.join(__dirname, '/../../dist')));

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
