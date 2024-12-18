"use strict";
// // backend/src/index.ts
// import express from 'express';
// import path from 'path';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import songsRouter from './songsController';
// import studiesRouter from './studiesController';
// dotenv.config();
// const app = express();
// // Specify allowed origins, methods, and headers for CORS
// const corsOptions = {
//   origin: ['http://localhost:3000', 'https://example.com'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };
// app.use(cors(corsOptions));
// // Add a limit to the request body size
// app.use(express.json({ limit: '10mb' }));
// // Serve static files from a specific directory
// app.use(
//   express.static(path.join(__dirname, '../build/server'), { maxAge: '1h' })
// );
// app.get('api/songs', songsRouter);
// app.get('api/studies', studiesRouter);
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/server', 'index.mjs'));
// });
// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });
const express = require('express'), path = require('path');
const app = express();
app.get('/api', (_request, response) => {
    response.send({ hello: 'World' });
});
app.use(express.static(path.join(path.resolve(), 'dist')));
app.listen(3000, () => {
    console.log('Redo på http://localhost:3000/');
});
