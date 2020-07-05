CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   username varchar(255),
   first_name varchar(255),
   last_name varchar(255),
   password_hash varchar(255)
);

INSERT INTO users (first_name, last_name, username, password_hash) VALUES ('Admin', '', 'admin', 'yourHashedSaltedPassword');