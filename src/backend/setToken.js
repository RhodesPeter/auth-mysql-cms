const jwt = require('express-jwt');

const setToken = (res) => {
  res.set('token', jwt({ secret: 'shhhhhhared-secret' }));
  // console.log(res.body);
  // window.sessionStorage.accessToken = res.body.access_token;
};

module.exports = setToken;
