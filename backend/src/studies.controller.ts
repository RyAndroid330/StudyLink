import express from 'express';
import pool from './db';

const studiesRouter = express.Router();
const studyRouter = express.Router();

studiesRouter.get('/studies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM studies');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch studies' });
  }
});

export default studiesRouter;

studyRouter.get('/study/search/:searchTerm', async (req, res) => {
  const searchTerm = req.params.searchTerm;
  try {
    const result = await pool.query(
      'SELECT * FROM studies WHERE title LIKE $1 OR lyrics LIKE $1',
      [`${searchTerm}%`]
    );
    console.log('Received search request with term:', searchTerm);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch study' });
  }
});
