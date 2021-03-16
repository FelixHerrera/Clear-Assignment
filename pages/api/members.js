import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const getMembers = async (req, res) => {
  const db = await open({
    filename: './mydatabase.db',
    driver: sqlite3.Database,
  });
  const memberList = await db.all('SELECT * from members');
  res.status(200).json({ memberList });
};

export default getMembers;
