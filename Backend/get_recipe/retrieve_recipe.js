const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');



require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER, // Adjusted from DB_POST to DB_USER for consistency
    host: process.env.DB_HOST,
    database: process.env.RECIPE_DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const app = express();
app.use(cors());
const port = process.env.PORT; // Different port for this microservice

// Middleware
app.use(bodyParser.json());

// Route to GET all recipes
app.get('/recipes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM recipes');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error retrieving recipes:', error);
        res.status(500).send('Server error');
    }
});

// Route to GET recipes by title substring
app.get('/recipes/title/:titleSubstring', async (req, res) => {
    const { titleSubstring } = req.params;
    try {
        const result = await pool.query('SELECT * FROM recipes WHERE title ILIKE $1', [`%${titleSubstring}%`]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).send('No recipes found with that title');
        }
    } catch (error) {
        console.error('Error retrieving recipes by title:', error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Retrieve_recipe server running on port ${port}`);
});
