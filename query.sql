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


-- Alter Table

ALTER TABLE users
ADD UNIQUE (email);

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

-- Step 1: Add the Columns

ALTER TABLE users 
ADD COLUMN created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;

-- Step 2: Create an Automatic Update Function

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 3: Create the Trigger

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Update

UPDATE users
SET name = "Sachin"
WHERE id = 1;

-- Create TODO Table

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE RESTRICT
);


-- Inset in todos

INSERT INTO todos (title, user_id)
VALUES ('Complete PostgreSQL', 1) RETURNING id, user_id;

INSERT INTO todos (title, user_id)
VALUES ('Complete PostgreSQL', 1) RETURNING *;