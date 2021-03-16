const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const setup = async () => {
  const db = await sqlite.open({
    filename: './mydatabase.db',
    driver: sqlite3.Database,
  });
  await db.migrate({ force: 'last' });
};

setup();
