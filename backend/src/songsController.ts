import express from 'express';
import pool from './db';

const songsRouter = express.Router();

songsRouter.get('/songs/search/:searchTerm', async (req, res) => {
  const searchTerm = req.params.searchTerm;
  try {
    const result = await pool.query(
      'SELECT * FROM songs WHERE title LIKE $1 OR lyrics LIKE $1',
      [`${searchTerm}%`]
    );
    console.log('Received search request with term:', searchTerm);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

export default songsRouter;
