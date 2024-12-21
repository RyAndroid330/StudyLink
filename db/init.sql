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

INSERT INTO studies(title,studyPassword)
VALUES ('Sin and Love','password');

INSERT INTO Slides(study_id, slideNumber, contentType, content)
VALUES
(1,1,'txt','Understanding Why God Allowed Sin and the Journey to Christ''s Sacrifice'),
(1,2,'txt','Free Will is Love in Action'),
(1,3,'BVer','gen.2.16-gen.2.17'),
(1,4,'txt','God did not create robots programmed to obey Him. Instead, He gave humanity the ability to choose—a reflection of His image (Genesis 1:27). Without the freedom to choose, love would be meaningless. God’s gift of free will was an invitation to love Him genuinely.'),
(1,5,'txt','Real Love Requires Choice'),
(1,6,'txt','The Consequences of Sin'),
(1,7,'BVer','rom.3.23'),
(1,8,'txt','Adam and Eve’s choice to disobey introduced sin and separation from God. Sin cannot coexist with God’s holy nature, so separation was a natural consequence.'),
(1,9,'BVer','deut.30.19-deut.30.20'),
(1,10,'txt','With free will comes the possibility of disobedience. Yet, God in His love always provides a way back to Him.'),
(1,11,'txt','God''s Plan for Redemption'),
(1,12,'BVer','john.3.16'),
(1,13,'txt','God’s justice required the penalty for sin, yet His love provided the solution in Jesus Christ. Jesus’ death demonstrates that God’s love isn’t based on our merit but His grace.'),
(1,14,'BVer','rom.5.8'),
(1,15,'txt','God''s Love That Restores'),
(1,16,'BVer','rom.8.38-rom.8.39'),
(1,17,'txt','God’s plan through Jesus isn’t just to forgive but to bring us back into a full relationship with Him. Even as redeemed believers, we are called to use our free will to choose God and live in His love.'),
(1,18,'txt','Conclusion: God''s Love and Our Choices'),
(1,19,'txt','God allowed sin because He desired a genuine, loving relationship with us—a relationship that required the gift of free will. Though sin brought separation, God’s love provided a way back through Jesus Christ.'),
(1,20,'txt','Memory Verse: John 3:16 - For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.'),
(1,21,'song','Forever My Love');
