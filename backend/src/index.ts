import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import songsRouter from './songs.controller';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/songs', songsRouter);

app.use(express.static(path.join(__dirname, '../build/server')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/server', 'index.mjs'));
});
