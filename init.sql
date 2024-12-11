-- Create the table for storing songs
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    song_name VARCHAR(255),
    lyrics TEXT
);

-- INSERT INTO songs (song_name, lyrics, language)
-- VALUES
-- ('holy', 'holy holy holy', 'en'),
-- ('song1', 'song1 lyrics', 'en'),
-- ('song2', 'song2 lyrics', 'en'),
-- ('song3', 'song3 lyrics', 'en'),
-- ('song4', 'song4 lyrics', 'en'),
-- ('song5', 'song5 lyrics', 'en'),
-- ('song6', 'song6 lyrics', 'en'),
-- ('song7', 'song7 lyrics', 'en'),
-- ('song8', 'song8 lyrics', 'en'),
-- ('song9', 'song9 lyrics', 'en'),
-- ('song10', 'song10 lyrics', 'en'),
-- ('song11', 'song11 lyrics', 'en'),
-- ('song12', 'song12 lyrics', 'en'),
-- ('song13', 'song13 lyrics', 'en'),
-- ('song14', 'song14 lyrics', 'en'),
-- ('song15', 'song15 lyrics', 'en'),
-- ('song16', 'song16 lyrics', 'en'),
-- ('song17', 'song17 lyrics', 'en'),
-- ('song18', 'song18 lyrics', 'en'),
-- ('song19', 'song19 lyrics', 'en'),
-- ('song20', 'song20 lyrics', 'en');

DO $$
DECLARE
    song_name text;
    song_file text;
    xml_data xml;
BEGIN
    -- Loop through the songs in the "en" folder
    FOR song_name IN SELECT * FROM pg_ls_dir('songs/en')
    LOOP
        -- Read the XML file into a variable
        song_file := 'songs/en/' || song_name;
        xml_data := pg_read_file(song_file);

        -- Parse the XML data and insert it into the songs table
        INSERT INTO songs (song_name, lyrics)
        SELECT (xpath('//song/name/text()', xml_data))[1]::text,
               (xpath('//song/lyrics/text()', xml_data))[1]::text;
    END LOOP;
END $$;
