const bcrypt = require('bcrypt');

const hashPassword = (plaintextPassword) => {
  //  Determines how complex the hashing is, a higher number will take more time
  const saltRounds = 10;

  return new Promise((resolve) => {
    bcrypt.hash(plaintextPassword, saltRounds).then(hash => resolve(hash));
  });
};

module.exports = hashPassword;
