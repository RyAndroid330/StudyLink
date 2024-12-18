"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = require("path");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var songs_controller_1 = require("./songs.controller");
var studies_controller_1 = require("./studies.controller");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/songs', songs_controller_1.default);
app.use('/studies', studies_controller_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '../build/server')));
app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../build/server', 'index.mjs'));
});
