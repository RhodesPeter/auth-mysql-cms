const connectToDB = require('./connectToDB');

const searchUserInDB = (req) => {
  const { username, password } = req.body;
  const databaseQuery = `
    SELECT * FROM users
    WHERE username = '${username}'
    AND password = '${password}'
  `;

  return connectToDB(databaseQuery);
};

module.exports = searchUserInDB;
