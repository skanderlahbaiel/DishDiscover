CREATE DATABASE recipes_db;

\c recipes_db

CREATE TABLE recipes (
    title text,
    ingredients text, 
    instructions text
);

CREATE USER recipe_user WITH LOGIN;

ALTER ROLE recipe_user WITH PASSWORD 'user'; 

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO recipe_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO recipe_user;
GRANT ALL PRIVILEGES ON DATABASE recipes_db TO recipe_user;
