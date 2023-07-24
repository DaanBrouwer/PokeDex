const { getDb } = require('../db');

async function getAllStatsAsArray() {  
  const query = `SELECT * FROM stat`;

  return getDb().all(query);
}

module.exports = {
  getAllStatsAsArray
}