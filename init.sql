-- Create the table for storing songs
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    lyrics TEXT
);

-- Creat table for Studies
CREATE TABLE studies(
  id SERIAL Primary KEY,
  title VARCHAR(255),
  studyPassword VARCHAR(255),
  slideNumber INT,
  contentType VARCHAR(255),
  content TEXT
)
