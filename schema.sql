-- Drops the todolist if it exists currently --
DROP DATABASE IF EXISTS casus_db;
-- Creates the "todolist" database --
CREATE DATABASE casus_db;
USE casus_db;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users( 
  id INTEGER(11) AUTO_INCREMENT NOT NULL,  
  PRIMARY KEY (id),   
  userid VARCHAR(15) NOT NULL,  
  password VARCHAR(15) NOT NULL, 
  email VARCHAR(35) NOT NULL,
  zipcode VARCHAR(10) NOT NULL
);

INSERT INTO Users (userid, password, email, zipcode) values("Rob", "Rob", "rob@gmail.com", "32835");
INSERT INTO Users (userid, password, email, zipcode) values("Rob O", "RobO", "robO@gmail.com", "32811");
INSERT INTO Users (userid, password, email, zipcode) values("Amani", "Amani", "amani@gmail.com", "32878");
INSERT INTO Users (userid, password, email, zipcode) values("Anibal", "Anibal", "anibal@gmail.com", "32837");
INSERT INTO Users (userid, password, email, zipcode) values("Tristan", "Tristan", "tristan@gmail.com", "32801");

DROP TABLE IF EXISTS Usertags;
CREATE TABLE Usertags (  
  tagid INTEGER, 
  usertag VARCHAR(15) NOT NULL,
  FOREIGN KEY (tagid) REFERENCES Users(id)
);

INSERT INTO Usertags (tagid, usertag) values(1,"pool");
INSERT INTO Usertags (tagid, usertag) values(1,"outdoor");
INSERT INTO Usertags (tagid, usertag) values(2,"sport");
INSERT INTO Usertags (tagid, usertag) values(2,"foodie");
INSERT INTO Usertags (tagid, usertag) values(3,"home");
INSERT INTO Usertags (tagid, usertag) values(3,"work");
INSERT INTO Usertags (tagid, usertag) values(4,"school");
INSERT INTO Usertags (tagid, usertag) values(4,"party");
INSERT INTO Usertags (tagid, usertag) values(5,"event");
INSERT INTO Usertags (tagid, usertag) values(5,"outdoor");


DROP TABLE IF EXISTS Userevents;
CREATE TABLE Userevents (
   eventid INTEGER,
   eventtitle VARCHAR(25) NOT NULL,
   eventdesc VARCHAR(255) NOT NULL,
   eventlocation VARCHAR(255) NOT NULL,
   eventstartdate DATETIME NOT NULL,
   eventenddate DATETIME NOT NULL,
   eventcapacity INTEGER  DEFAULT 0 NOT NULL,
   eventpublic BOOLEAN DEFAULT false NOT NULL,
   eventprivate BOOLEAN DEFAULT false NOT NULL,
   eventcategoryid INTEGER,
   FOREIGN KEY (eventid) REFERENCES Users(id)
);  

INSERT INTO Userevents (eventid, eventtitle, eventdesc, eventlocation, eventstartdate, eventenddate, eventcapacity, eventpublic, eventprivate, eventcategoryid) 
values(1,"BBQ", "Summer BBQ at my house", "Valencia West", "2018-06-01T13:00", "2018-06-01T18:00",
20, false, true, 7 );
INSERT INTO Userevents (eventid, eventtitle, eventdesc, eventlocation, eventstartdate, eventenddate, eventcapacity, eventpublic, eventprivate, eventcategoryid) 
values(2,"Wedding", "Sisters Wedding", "Houston", "2018-09-01T13:00", "2018-09-01T18:00",
200, false, true, 12 );
INSERT INTO Userevents (eventid, eventtitle, eventdesc, eventlocation, eventstartdate, eventenddate, eventcapacity, eventpublic, eventprivate, eventcategoryid) 
values(3,"Ramadan", "2018 Ramandan", "Home", "2018-05-17T00:01", "2018-06-15T23:59",
1, false, true, 1 );
INSERT INTO Userevents (eventid, eventtitle, eventdesc, eventlocation, eventstartdate, eventenddate, eventcapacity, eventpublic, eventprivate, eventcategoryid) 
values(4,"Beach", "Beach party", "New Smurna", "2018-06-06T13:00", "2018-06-06T18:00",
1, false, true, 10 );
INSERT INTO Userevents (eventid, eventtitle, eventdesc, eventlocation, eventstartdate, eventenddate, eventcapacity, eventpublic, eventprivate, eventcategoryid) 
values(5,"School End", "End of school", "Valencia West", "2018-07-29T13:00", "2018-07-29T18:00",
20, false, true, 5 );

DROP TABLE IF EXISTS Userlikes;
CREATE TABLE Userlikes (
   likeid INTEGER,
   liketitle VARCHAR(25) NOT NULL,
   likedesc VARCHAR(255) NOT NULL,
   likelocation VARCHAR(255) NOT NULL,
   likestartdate DATETIME NOT NULL,
   likenddate DATETIME NOT NULL,
   likesource VARCHAR(255) NOT NULL,
   FOREIGN KEY (likeid) REFERENCES Users(id)
);    

INSERT INTO Userlikes (likeid, liketitle, likedesc, likelocation, likestartdate, likenddate, likesource) 
values(1,"BBQ", "Summer BBQ at my house", "Valencia West", "2018-06-01T13:00", "2018-06-01T18:00", "casus");
INSERT INTO Userlikes (likeid, liketitle, likedesc, likelocation, likestartdate, likenddate, likesource) 
values(2,"BBQ", "Summer BBQ at my house", "Valencia West", "2018-06-01T13:00", "2018-06-01T18:00", "casus");
INSERT INTO Userlikes (likeid, liketitle, likedesc, likelocation, likestartdate, likenddate, likesource) 
values(3,"BBQ", "Summer BBQ at my house", "Valencia West", "2018-06-01T13:00", "2018-06-01T18:00", "casus");
INSERT INTO Userlikes (likeid, liketitle, likedesc, likelocation, likestartdate, likenddate, likesource) 
values(4,"Beach", "Summer BBQ at my house", "Valencia West", "2018-06-01T13:00", "2018-06-01T18:00", "casus");
INSERT INTO Userlikes (likeid, liketitle, likedesc, likelocation, likestartdate, likenddate, likesource) 
values(4,"BBQ", "Summer BBQ at my house", "Valencia West", "2018-06-01T13:00", "2018-06-01T18:00", "casus");
INSERT INTO Userlikes (likeid, liketitle, likedesc, likelocation, likestartdate, likenddate, likesource) 
values(5,"BBQ", "Summer BBQ at my house", "Valencia West", "2018-06-01T13:00", "2018-06-01T18:00", "casus");
INSERT INTO Userlikes (likeid, liketitle, likedesc, likelocation, likestartdate, likenddate, likesource) 
values(1,"BBQ", "Summer BBQ at my house", "Valencia West", "2018-06-01T13:00", "2018-06-01T18:00", "casus");
INSERT INTO Userlikes (likeid, liketitle, likedesc, likelocation, likestartdate, likenddate, likesource) 
values(2,"BBQ", "Summer BBQ at my house", "Valencia West", "2018-06-01T13:00", "2018-06-01T18:00", "casus");



DROP TABLE IF EXISTS Categories;
CREATE TABLE Categories (
  categoryid INTEGER,
  category VARCHAR(45)
);

INSERT INTO Categories (categoryid, category) values (1, 'Music (music)'), (2, 'Visual Arts (visual-arts)'), (3, 'Performing Arts (performing-arts)'), (4, 'Film (film)'),
    (5, 'Lectures & Books (lectures-books)'), (6, 'Fashion (fashion)'), (7, 'Food & Drink (food-and-drink)') ,  (8, 'Festivals & Fairs (festivals-fairs)'),
    (9, 'Charities (charities)'), (10, 'Sports & Active Life (sports-active-life)'), (11, 'Nightlife (nightlife)'), (12, 'Kids & Family (kids-family)'),
    (13, 'Other (other)');

SELECT * FROM  Users;

SELECT * FROM  Usertags;

SELECT Users.userid, Usertags.usertag FROM  Usertags
  LEFT JOIN Users ON tagid = id;

SELECT Users.userid, Usertags.usertag FROM  Usertags
LEFT JOIN Users ON tagid = id WHERE Users.id = 1; 

SELECT * FROM  Userevents;

SELECT Users.userid, Userevents.* FROM  Userevents
  LEFT JOIN Users ON eventid = id;

SELECT Users.userid, Userevents.* FROM  Userevents
LEFT JOIN Users ON eventid = id WHERE Users.id = 3;

SELECT * FROM  Userlikes;

SELECT Users.userid, Userlikes.* FROM  Userlikes
LEFT JOIN Users ON likeid = id;

SELECT Users.userid, Userlikes.* FROM  Userlikes
LEFT JOIN Users ON likeid = id WHERE Users.id = 2;

DELETE FROM Userlikes WHERE likeid = 4 AND liketitle = "BBQ";

SELECT * FROM  Categories;


