const jwt = require('express-jwt');

const jwtSecret = process.env.JWT_SECRET;

const checkAuthorization = () => jwt({
  secret: jwtSecret,
  getToken: function fromHeader(req) {
    return req.cookies.sessionToken ? req.cookies.sessionToken : null;
  },
});

module.exports = checkAuthorization;
