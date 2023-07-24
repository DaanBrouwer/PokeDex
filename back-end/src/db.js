const fs = require('fs');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

let db;

async function setupDatabase() {
  if (process.env.NODE_ENV === 'development') {
    console.log('Setting up databases');
  }

  db = await open({ filename: ':memory:', driver: sqlite3.Database });

  if (process.env.NODE_ENV === 'development') {
    console.log('Preparing to fill databases');
  }

  await setup('pokemon-data.sql');
  await setup('weather-data.sql');
}

async function setup(file) {
  const sql = fs.readFileSync(`${__dirname}/data/${file}`).toString();

  try {
    await db.exec(sql);
    if (process.env.NODE_ENV === 'development') {
      console.log(`Read database ${file}`);
    }
  } catch (error) {
    console.error(error);
  }
}

function getDb() {
  return db;
}

module.exports = { getDb, setupDatabase };
