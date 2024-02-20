CREATE DATABASE recipes_db;

CREATE TABLE recipes (
    title text,
    ingredients text, 
    instructions text
);

CREATE USER recipes_user WITH LOGIN;

ALTER ROLE recipes_user WITH PASSWORD 'user'; 