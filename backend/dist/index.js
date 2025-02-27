"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
app.get('/api/studies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.default.query('SELECT * FROM studies');
    res.json(users.rows);
}));
app.get('/api/studies/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const study_id = req.params.id;
    const slides = yield db_1.default.query('SELECT * FROM studies WHERE id = $1', [
        study_id,
    ]);
    res.json(slides.rows);
}));
app.get('/api/study/:study_id/slide/:slide_number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const study_id = req.params.study_id;
    const slide_number = req.params.slide_number;
    const slide = yield db_1.default.query('SELECT * FROM slides WHERE study_id = $1 AND slidenumber = $2', [study_id, slide_number]);
    res.json(slide.rows[0]);
}));
app.get('/api/songs/search/:searchTerm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.params.searchTerm;
    const users = yield db_1.default.query('SELECT * FROM songs WHERE title ILIKE $1', [
        `${searchTerm}%`,
    ]);
    res.json(users.rows);
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
