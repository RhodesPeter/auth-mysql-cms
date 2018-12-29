const validateSignupDetails = (req) => {
  const { username, password } = req.body;

  return {
    valid: username.length >= 5 && password.length >= 5,
    err: 'username and password too short, must be at least 5 characters long',
  };
};

module.exports = validateSignupDetails;
