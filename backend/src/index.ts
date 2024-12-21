import express from 'express';
import pool from './db';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.get('/api/studies', async (req, res) => {
  const users = await pool.query('SELECT * FROM studies');
  res.json(users.rows);
});

app.get('/api/studies/:id', async (req, res) => {
  const study_id = req.params.id;
  const slides = await pool.query('SELECT * FROM studies WHERE id = $1', [
    study_id,
  ]);
  res.json(slides.rows);
});
app.get('/api/study/:study_id/slide/:slide_number', async (req, res) => {
  const study_id = req.params.study_id;
  const slide_number = req.params.slide_number;
  const slide = await pool.query(
    'SELECT * FROM slides WHERE study_id = $1 AND slidenumber = $2',
    [study_id, slide_number]
  );
  res.json(slide.rows[0]);
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
