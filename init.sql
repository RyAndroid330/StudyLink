-- Add other tables here
Create the database and user (if required)
CREATE DATABASE worship_songs;

-- Connect to the database
\c worship_songs;

-- Create the table for storing songs
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    song_name VARCHAR(255),
    lyrics TEXT,
    language VARCHAR(50)
);

import os
import xml.etree.ElementTree as ET
import psycopg2

# Database connection setup
conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="password",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()

# Function to parse XML files and insert data
def import_xml_files(directory):
    for lang in os.listdir(directory):  # Loop through language folders
        lang_dir = os.path.join(directory, lang)  # Full path to language folder
        if os.path.isdir(lang_dir):  # Ensure it's a directory
            for filename in os.listdir(lang_dir):  # Loop through song XMLs in the language folder
                if filename.endswith(".xml"):  # Only process XML files
                    file_path = os.path.join(lang_dir, filename)
                    tree = ET.parse(file_path)  # Parse the XML file
                    root = tree.getroot()

                    # Assuming the lyrics are in a <lyrics> tag
                    lyrics = root.find('lyrics').text if root.find('lyrics') is not None else "No lyrics found"
                    song_name = os.path.splitext(filename)[0]  # Get song name from the file name

                    # Insert into PostgreSQL table, including language
                    cursor.execute("""
                        INSERT INTO songs (song_name, lyrics, language)
                        VALUES (%s, %s, %s);
                    """, (song_name, lyrics, lang))

    # Commit the changes to the database
    conn.commit()

# Specify the base directory containing language folders
directory = '/songs'
import_xml_files(directory)

# Close the database connection
cursor.close()
conn.close()
