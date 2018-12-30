const connectToDB = require('./connectToDB');

const updatePageInDB = (pageToUpdate, data) => {
  const databaseQuery = `
    UPDATE pages
    SET
      page_title = '${data.blogTitle}',
      paragraph_1 = '${data.paragraphOne}',
      paragraph_2 = '${data.paragraphTwo}',
      paragraph_3 = '${data.paragraphThree}'
    WHERE page = '${pageToUpdate}';
  `;

  return connectToDB(databaseQuery).then(databaseResponse => databaseResponse);
};

module.exports = updatePageInDB;
