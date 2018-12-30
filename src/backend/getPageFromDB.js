const connectToDB = require('./connectToDB');

const getPageFromDB = (page) => {
  const databaseQuery = `
    SELECT page_title, paragraph_1, paragraph_2, paragraph_3
    FROM pages
    WHERE page = '${page}';
  `;

  return connectToDB(databaseQuery).then(databaseResponse => databaseResponse);
};

module.exports = getPageFromDB;
