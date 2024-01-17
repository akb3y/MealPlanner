-- Create Database
CREATE DATABASE menu;

-- Connect to the Database
\c menu;

-- Create Table
CREATE TABLE recipes (
    recipe_id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    photos TEXT,
    ingredients TEXT[],
    instructions TEXT[],
    url TEXT,
);