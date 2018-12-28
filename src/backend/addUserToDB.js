const connectToDB = require('./connectToDB');
const hashPassword = require('./hashPassword');

const addUserToDB = (req) => {
  const { username, password } = req.body;

  return hashPassword(password).then((hashedPassword) => {
    const databaseCommand = `
      INSERT INTO users (username, password)
      VALUES ('${username}', '${hashedPassword}')
    `;

    connectToDB(databaseCommand);
  });
};

module.exports = addUserToDB;
