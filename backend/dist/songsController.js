"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const songsRouter = express_1.default.Router();
songsRouter.get('/songs/search/:searchTerm', async (req, res) => {
    const searchTerm = req.params.searchTerm;
    try {
        const result = await db_1.default.query('SELECT * FROM songs WHERE title LIKE $1 OR lyrics LIKE $1', [`${searchTerm}%`]);
        console.log('Received search request with term:', searchTerm);
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch songs' });
    }
});
exports.default = songsRouter;
