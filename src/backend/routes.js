const pageContent = require('./pageContent');

const routes = (app) => {
  app.get('/', (req, res) => {
    res.render('homepage', pageContent.homepage);
  });

  app.get('/login', (req, res) => {
    res.render('login', pageContent.login);
  });

  app.get('/cms', (req, res) => {
    res.render('cms', pageContent.cms);
  });
};

module.exports = routes;
