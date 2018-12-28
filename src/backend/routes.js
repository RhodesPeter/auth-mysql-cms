const jwt = require('express-jwt');
const pageContent = require('./pageContent');
// const setCookie = require('./setCookie');
const setToken = require('./setToken');
const searchUserInDB = require('./searchUserInDB');
const addUserToDB = require('./addUserToDB');
const comparePasswords = require('./comparePasswords');

const routes = (app) => {
  app.get('/', (req, res) => {
    res.render('homepage', pageContent.homepage);
  });

  app.get('/cms', jwt({ secret: 'shhhhhhared-secret' }), (req, res) => {
    res.render('cms', pageContent.cms);
  });

  app.post('/signup', (req, res) => {
    addUserToDB(req).then(() => {
      res.send('User created!');
    });
  });

  app.post('/login', (req, res) => {
    searchUserInDB(req).then((data) => {
      const { password } = req.body;
      if (data[0].username && comparePasswords(password, data[0].password)) {
        setToken(res);
        // setCookie(req, res);
        res.redirect('/cms');
      } else {
        res.redirect('/');
      }
    });
  });
};

module.exports = routes;
