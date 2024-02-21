const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const http = require('http');
const hostname = '0.0.0.0';

require('dotenv').config();


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.RECIPE_DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const app = express();
const port = process.env.PORT ;
app.use(cors({
    origin: '*', // Allow requests from any origin (replace '*' with your frontend URL for better security)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the specified HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow the specified headers
  }));


// Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Route to POST a recipe
app.post('/recipe', async (req, res) => {
    const { title, ingredients, instructions } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO recipes (title, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *',
            [title, ingredients, instructions]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting recipe:', error);
        res.status(500).send('Server error');
    }
});

// Start the server and bind it to 0.0.0.0
const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`postrecipe server running on port ${port}`);
});
