-- Create Database
CREATE DATABASE recipes;

-- Connect to the Database
\c recipes;

-- Create Table
CREATE TABLE recipe (
    recipe_id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    photos TEXT,
    ingredients TEXT[],
    instructions TEXT[],
    url TEXT
);