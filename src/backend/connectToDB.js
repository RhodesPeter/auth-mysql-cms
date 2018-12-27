const mysql = require('mysql');

// If not local this needs to be an .env file
const databaseDetails = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'explorify-2',
};

const connectToDB = databaseQuery => new Promise((resolve, reject) => {
  const connection = mysql.createConnection(databaseDetails);

  connection.connect();
  connection.query(databaseQuery, (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
  connection.end();
});

module.exports = connectToDB;
