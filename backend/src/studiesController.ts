import express, { Request, Response, NextFunction } from 'express';
import pool from './db';

const studiesRouter = express.Router();
studiesRouter.get('/studies', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM studies');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching studies' });
  }
});

studiesRouter.get(
  '/study/search/:searchTerm',
  async (req: Request, res: Response) => {
    const searchTerm = req.params.searchTerm;
    try {
      const result = await pool.query(
        'SELECT * FROM studies WHERE title LIKE $1 OR lyrics LIKE $1',
        [`${searchTerm}%`]
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error searching studies' });
    }
  }
);

export default studiesRouter;
