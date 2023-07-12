const db = require('../db');

async function clearData() {
  try {
    await db.query('DELETE FROM applications');
    await db.query('DELETE FROM grants');
    await db.query('DELETE FROM programs');
    console.log('Data cleared successfully.');
  } catch (err) {
    console.error(`Error clearing data: ${err.message}`);
  }
}

clearData();
