const validateSignupDetails = (req) => {
  const { username, password } = req.body;

  // In here we should really check if there is already a user with that username

  return {
    valid: username.length >= 5 && password.length >= 5,
    err: 'username and password too short, must be at least 5 characters long',
  };
};

module.exports = validateSignupDetails;
