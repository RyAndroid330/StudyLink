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

  const promises = files.map((file) => {
    const filePath = `${enFolder}/${file}`;
    return new Promise<void>((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, fileContent) => {
        if (err) {
          reject(err);
        } else {
          const parser = new xml2js.Parser();
          parser.parseString(fileContent, (err, result) => {
            if (err) {
              reject(err);
            } else {
              const title = result.song.title[0];
              const lyrics = result.song.lyrics[0];

              db.query(
                `INSERT INTO songs (title, lyrics) VALUES ($1, $2)`,
                [title, lyrics],
                (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    console.log(`Inserted song ${title} into database`);
                    resolve();
                  }
                }
              );
            }
          });
        }
      });
    });
  });

  Promise.all(promises)
    .then(() => {
      console.log('All files processed');
      db.end();
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      db.end();
      process.exit(1);
    });
});
