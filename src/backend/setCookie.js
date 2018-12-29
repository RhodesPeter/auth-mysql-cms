const path = require('path');
const env = require('env2')(path.join(__dirname, '../../env.json'));
const jwt = require('jsonwebtoken');

const setCookie = (req, res, username) => {
  const jwtSecret = process.env.JWT_SECRET;
  const { cookie } = req.headers;

  if (cookie === undefined) {
    const token = jwt.sign({ username }, jwtSecret);

    res.cookie('sessionToken', token, {
      maxAge: 90000,
      httpOnly: true,
    });
  }
};

module.exports = setCookie;
