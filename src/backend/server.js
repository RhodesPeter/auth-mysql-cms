const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const app = express();
const port = 3000;

// define 'Pug' as the templating engine
app.set('view engine', 'pug');

// To parse POST request data/body
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// Serve all files in the 'dist' folder
app.use('/', express.static(path.join(__dirname, '/../../dist')));

// Initialize routes
routes(app);

// Start server
app.listen(port, () => console.log(`App listening on port ${port}!`));
