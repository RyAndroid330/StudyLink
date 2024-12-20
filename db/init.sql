-- Create the table for storing songs
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    lyrics TEXT
);

-- Creat table for Studies
CREATE TABLE studies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  studyPassword VARCHAR(255)
);

CREATE TABLE slides (
  id SERIAL PRIMARY KEY,
  study_id INTEGER NOT NULL REFERENCES studies(id),
  slideNumber INT,
  contentType VARCHAR(255),
  content TEXT
);
