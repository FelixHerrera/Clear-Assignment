import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const getMembers = async (req, res) => {
  const { id } = req.query;
  const db = await open({
    filename: './mydatabase.db',
    driver: sqlite3.Database,
  });
  let status;
  if (req.method === 'POST') {
    try {
      const { organization_id } = JSON.parse(req.body);
      if (!organization_id) {
        throw new Error('Organization id not found!');
      }
      await db.run(`UPDATE members set organization_id = "${organization_id}" where id = "${id}"`);
      const changedValue = await db.all(`SELECT * from members where id ="${id}"`);
      status = res.status(200).json({ changedValue });
    } catch (err) {
      status = res.status(400).json({ error: err.message });
    }
  } else {
    status = res.status(404).json({ error: 'Resource not found!' });
  }
  return status;
};

export default getMembers;
