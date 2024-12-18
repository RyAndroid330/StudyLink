"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const studiesRouter = express_1.default.Router();
studiesRouter.get('/studies', async (req, res) => {
    try {
        const result = await db_1.default.query('SELECT * FROM studies');
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching studies' });
    }
});
studiesRouter.get('/study/search/:searchTerm', async (req, res) => {
    const searchTerm = req.params.searchTerm;
    try {
        const result = await db_1.default.query('SELECT * FROM studies WHERE title LIKE $1 OR lyrics LIKE $1', [`${searchTerm}%`]);
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error searching studies' });
    }
});
exports.default = studiesRouter;
