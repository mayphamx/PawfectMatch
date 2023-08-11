DROP DATABASE IF EXISTS pawfect_db;
CREATE DATABASE pawfect_db;

-- CREATE TABLE users (
--   id INT NOT NULL AUTO_INCREMENT ,
--   user_name VARCHAR(255),
--   email VARCHAR(255), 
--   password VARCHAR(255),
--   location VARCHAR(255),
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE pets (
--   id INT NOT NULL AUTO_INCREMENT,
--   user_id INT NOT NULL,
--   pet_name VARCHAR(255), 
--   breed VARCHAR(255),
--   age INT,
--   personality VARCHAR(255),
--   photo VARCHAR(255), -- Verify datatype --
--   PRIMARY KEY (id),
--   FOREIGN KEY (user_id) 
--   REFERENCES users(id) ON DELETE CASCADE
-- );

-- CREATE TABLE meetups (
--   id INT NOT NULL AUTO_INCREMENT, 
--   title VARCHAR(255),
--   meetup_date DATE,
--   location VARCHAR(255),
--   description TEXT,
--   host_id INT NOT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (host_id) REFERENCES users(id) ON DELETE SET NULL
-- );

-- CREATE TABLE meetup_pets (
--   meetup_id INT NOT NULL AUTO_INCREMENT,
--   pet_id INT NOT NULL,
--   FOREIGN KEY (meetup_id) REFERENCES meetups(id) ON DELETE SET NULL,
--   FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE SET NULL
-- );

-- CREATE TABLE meetup_comments (
--   id INT NOT NULL AUTO_INCREMENT,
--   meetup_id INT NOT NULL,
--   user_id INT NOT NULL, 
--   comment TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (meetup_id) REFERENCES meetups(id) ON DELETE SET NULL,
--   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
-- );

-- CREATE TABLE meetup_rsvps (
--   meetup_id INT NOT NULL AUTO_INCREMENT,
--   user_id INT NOT NULL,
--   FOREIGN KEY (meetup_id) REFERENCES meetups(id) ON DELETE SET NULL,
--   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
-- );