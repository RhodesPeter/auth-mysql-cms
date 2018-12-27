const isUserAuthenticated = (req, res, next) => {
  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  // if (req.user.authenticated) {
  //   return next();
  // }

  if (true) {
    return next();
  }

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  // @TODO Change this route or something
  return res.redirect('/');
};

module.exports = isUserAuthenticated;
