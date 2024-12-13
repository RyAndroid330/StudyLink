"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var pg = require("pg");
var xml2js = require("xml2js");
var enFolder = './en';
var db = new pg.Client({
    host: 'localhost',
    port: 5433,
    database: 'StudyLink',
    user: 'SLAdmin',
    password: 'password',
});
db.connect();
fs.readdir(enFolder, function (err, files) {
    if (err) {
        console.error(err);
        return;
    }
    files.forEach(function (file) {
        var filePath = "".concat(enFolder, "/").concat(file);
        var fileContent = fs.readFileSync(filePath, 'utf8');
        var parser = new xml2js.Parser();
        parser.parseString(fileContent, function (err, result) {
            if (err) {
                console.error(err);
                return;
            }
            var title = result.song.title[0];
            var lyrics = result.song.lyrics[0];
            db.query("INSERT INTO songs (title, lyrics) VALUES ($1, $2)", [title, lyrics], function (err, result) {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log("Inserted song ".concat(title, " into database"));
                }
            });
        });
    });
});
