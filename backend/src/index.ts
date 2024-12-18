import express from 'express';
import pool from './db';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.get('/api/studies', async (req, res) => {
  const users = await pool.query('SELECT * FROM studies WHERE slideNumber =1');
  res.json(users.rows);
});

app.get('/api/songs/search/:searchTerm', async (req, res) => {
  const searchTerm = req.params.searchTerm;
  const users = await pool.query('SELECT * FROM songs WHERE title ILIKE $1', [
    `${searchTerm}%`,
  ]);
  res.json(users.rows);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
