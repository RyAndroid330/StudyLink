import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import songsRouter from './songs.controller';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', songsRouter);

app.get('/', (req, res) => {
  res.redirect('/api');
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
