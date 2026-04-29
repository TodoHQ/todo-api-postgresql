-- Create Database

CREATE DATABASE todo;

-- Switch database

\c todo

-- Create Table

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    age INT
);

-- Insert Data

INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@example.com', 25);

-- Insert Multiple Rows

INSERT INTO users (name, email, age)
VALUES 
('Bob', 'bob@example.com', 30),
('Charlie', 'charlie@example.com', 28);

-- Delete 1

DELETE FROM users
WHERE id = 1;

-- Drop Table

DROP TABLE users;

-- Drop Database

DROP DATABASE todo;


-- Remove All Data Faster

TRUNCATE TABLE users;