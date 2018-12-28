// const basicAuth = require('express-basic-auth');
const pageContent = require('./pageContent');
const isUserAuthenticated = require('./isUserAuthenticated');
const setCookie = require('./setCookie');
const searchUserInDB = require('./searchUserInDB');

// const staticUserAuth = basicAuth({
//   users: {
//     admin: 'admin',
//   },
// });

const routes = (app) => {
  app.get('/', (req, res) => {
    res.render('homepage', pageContent.homepage);
  });

  app.post('/login', (req, res) => {
    searchUserInDB(req).then((data) => {
      if (data[0]) {
        setCookie(req, res);
        res.redirect('/cms');
      } else {
        res.redirect('/');
      }
    });
  });

  app.get('/cms', isUserAuthenticated, (req, res) => {
    res.render('cms', pageContent.cms);
  });
};

module.exports = routes;
