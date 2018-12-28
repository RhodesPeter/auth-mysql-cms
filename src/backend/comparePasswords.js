const bcrypt = require('bcrypt');

/**
 * Returns a boolean confirming weather or not the password and hash match
 * @returns {boolean}
 */
const comparePasswords = (plaintextPassword, hash) => new Promise((resolve) => {
  bcrypt.compare(plaintextPassword, hash).then(data => resolve(data));
});

module.exports = comparePasswords;
