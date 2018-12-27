// const basicAuth = require('express-basic-auth');
const pageContent = require('./pageContent');
// const isUserAuthenticated = require('./isUserAuthenticated');

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
    const { username, password } = req.body;

    // you might like to do a database look-up or something more scalable here
    if (username && username === 'admin' && password && password === 'admin') {
      res.redirect('/cms');
    } else {
      res.redirect('/');
    }
  });

  app.get('/cms', (req, res) => {
    // const cookie = req.cookies;
    // console.log(req);
    // if (cookie === undefined) {
    //   // no: set a new cookie
    //   let randomNumber = Math.random().toString();
    //   randomNumber = randomNumber.substring(2, randomNumber.length);
    //   res.cookie('userCookie', randomNumber, { maxAge: 900000, httpOnly: true });
    //   console.log('cookie created successfully');
    // } else {
    //   console.log('cookie exists', cookie);
    // }

    res.render('cms', pageContent.cms);
  });
};

module.exports = routes;
