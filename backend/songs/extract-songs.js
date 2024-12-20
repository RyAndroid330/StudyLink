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
    var promises = files.map(function (file) {
        var filePath = "".concat(enFolder, "/").concat(file);
        return new Promise(function (resolve, reject) {
            fs.readFile(filePath, 'utf8', function (err, fileContent) {
                if (err) {
                    reject(err);
                }
                else {
                    var parser = new xml2js.Parser();
                    parser.parseString(fileContent, function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            var title_1 = result.song.title[0];
                            var lyrics = result.song.lyrics[0];
                            db.query("INSERT INTO songs (title, lyrics) VALUES ($1, $2)", [title_1, lyrics], function (err, result) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    console.log("Inserted song ".concat(title_1, " into database"));
                                    resolve();
                                }
                            });
                        }
                    });
                }
            });
        });
    });
    Promise.all(promises)
        .then(function () {
        console.log('All files processed');
        db.end();
        process.exit(0);
    })
        .catch(function (err) {
        console.error(err);
        db.end();
        process.exit(1);
    });
});
