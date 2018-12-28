const isUserAuthenticated = (req, res, next) => {
  // CHECK THE USER STORED IN SESSION
  const { cookie } = req.headers;
  const decodedCookie = decodeURIComponent(cookie);

  if (decodedCookie === 'userCookie=hashGoesHere?') {
    return next();
  }

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE ELSE
  return res.redirect('/');
};

module.exports = isUserAuthenticated;
