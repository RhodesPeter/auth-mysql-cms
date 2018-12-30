const path = require('path');
const env = require('env2')(path.join(__dirname, '../../env.json'));
const pageContent = require('./pageContent');
const setCookie = require('./setCookie');
const searchUserInDB = require('./searchUserInDB');
const addUserToDB = require('./addUserToDB');
const comparePasswords = require('./comparePasswords');
const validateSignupDetails = require('./validateSignupDetails');
const checkAuthorization = require('./checkAuthorization');
const updatePageInDB = require('./updatePageInDB');
const getPageFromDB = require('./getPageFromDB');

// userDetails variable that can be accesses by all routes that need it
const userDetails = {};

const routes = (app) => {
  app.get('/', (req, res) => {
    res.render('homepage', pageContent.homepage);
  });

  app.get('/cms', checkAuthorization(), (req, res) => {
    // Really all content should come from the DB or in the frontend rather than
    // in the pageContent file which is why there currently a slightly confusing
    // mix of content sources

    getPageFromDB('blog').then((data) => {
      res.render('cms', {
        title: pageContent.cms.title,
        blogTitle: data[0].page_title,
        blogParagraphOne: data[0].paragraph_1,
        blogParagraphTwo: data[0].paragraph_2,
        blogParagraphThree: data[0].paragraph_3,
        userDetails,
      });
    });
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

  app.get('/signup', (req, res) => {
    res.render('signup', pageContent.signup);
  });

  app.get('/login', (req, res) => {
    res.render('login', pageContent.login);
  });

  app.post('/login', (req, res) => {
    searchUserInDB(req)
      .then((data) => {
        // If no user found in database
        if (!data[0]) {
          return res.redirect('/login');
        }

        const { password: clearTextPassword } = req.body;
        const { username, password: hashedPassword } = data[0];

        userDetails.username = username;

        return comparePasswords(clearTextPassword, hashedPassword);
      }).then((data) => {
        // If user password and hashed DB password match
        if (data) {
          setCookie(req, res, userDetails.username);
          res.redirect('/cms');
        } else {
          res.redirect('/login');
        }
      });
  });

  app.post('/update-blog-content', (req, res) => {
    updatePageInDB('blog', {
      blogTitle: req.body['blog-title'],
      paragraphOne: req.body['blog-paragraph-1'],
      paragraphTwo: req.body['blog-paragraph-2'],
      paragraphThree: req.body['blog-paragraph-3'],
    }).then(() => res.send('Blog updated!'))
      .catch(err => res.send(err));
  });

  app.get('/blogpage', (req, res) => {
    getPageFromDB('blog').then((data) => {
      res.render('blogpage', {
        title: data[0].page_title,
        paragraphs: [
          data[0].paragraph_1,
          data[0].paragraph_2,
          data[0].paragraph_3,
        ],
      });
    });
  });
};

module.exports = routes;
