const jwt = require('express-jwt');
const path = require('path');
const env = require('env2')(path.join(__dirname, '../../env.json'));
const pageContent = require('./pageContent');
const setCookie = require('./setCookie');
const searchUserInDB = require('./searchUserInDB');
const addUserToDB = require('./addUserToDB');
const comparePasswords = require('./comparePasswords');
const validateSignupDetails = require('./validateSignupDetails');

const jwtSecret = process.env.JWT_SECRET;

const routes = (app) => {
  app.get('/', (req, res) => {
    res.render('homepage', pageContent.homepage);
  });

  app.get('/cms', jwt({
    secret: jwtSecret,
    getToken: function fromHeader(req) {
      return req.cookies.sessionToken ? req.cookies.sessionToken : null;
    },
  }), (req, res) => {
    res.render('cms', pageContent.cms);
  });

  app.post('/signup', (req, res) => {
    const signUpDetailsValid = validateSignupDetails(req);

    if (!signUpDetailsValid.valid) {
      return res.send(signUpDetailsValid.err);
    }

    return addUserToDB(req).then(() => {
      res.send('User created!');
    });
  });

  app.post('/login', (req, res) => {
    searchUserInDB(req)
      .then((data) => {
        // If no user found in database
        if (!data[0]) {
          return res.redirect('/');
        }

        const { password: clearTextPassword } = req.body;
        const { username, password: hashedPassword } = data[0];

        return comparePasswords(clearTextPassword, hashedPassword, username);
      }).then((data, username) => {
        // If user password and hashed DB password match
        if (data) {
          setCookie(req, res, username);
          res.redirect('/cms');
        } else {
          res.redirect('/');
        }
      });
  });
};

module.exports = routes;
