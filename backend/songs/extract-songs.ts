import * as fs from 'fs';
import * as pg from 'pg';
import * as xml2js from 'xml2js';

const enFolder = './en';
const db = new pg.Client({
  host: 'localhost',
  port: 5433,
  database: 'StudyLink',
  user: 'SLAdmin',
  password: 'password',
});

db.connect();

fs.readdir(enFolder, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    const filePath = `${enFolder}/${file}`;
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const parser = new xml2js.Parser();
    parser.parseString(fileContent, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      const title = result.song.title[0];
      const lyrics = result.song.lyrics[0];

      db.query(
        `INSERT INTO songs (title, lyrics) VALUES ($1, $2)`,
        [title, lyrics],
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Inserted song ${title} into database`);
          }
        }
      );
    });
  });
});
