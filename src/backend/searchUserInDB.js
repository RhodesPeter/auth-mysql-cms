const connectToDB = require('./connectToDB');

const searchUserInDB = (req) => {
  const { username } = req.body;
  const databaseQuery = `
    SELECT username, password
    FROM users
    WHERE username = '${username}'
  `;

  return connectToDB(databaseQuery);
};

module.exports = searchUserInDB;
