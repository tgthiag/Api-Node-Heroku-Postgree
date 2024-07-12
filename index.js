const express = require("express");
const app = express();
const { Pool } = require('pg');
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Create table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT
  )
`);

app.get("/", (req, res) => {
  res.send("Hello world, from Heroku");
});

// GET route to fetch all items
app.get("/items", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET route to fetch a specific item
app.get("/items/:id", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [req.params.id]);
    if (result.rows.length) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Item not found in database");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST route to create a new item
app.post("/items", async (req, res) => {
  try {
    const result = await pool.query('INSERT INTO items (name, price) VALUES ($1, $2) RETURNING *', [req.body.name, req.body.price]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT route to update an existing item
app.put("/items/:id", async (req, res) => {
  try {
    const result = await pool.query('UPDATE items SET name = $1 , price = $2 WHERE id = $3 RETURNING *', [req.body.name, req.body.price, req.params.id]);
    if (result.rows.length) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Item not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE route to delete an item
app.delete("/items/:id", async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length) {
      res.status(204).send();
    } else {
      res.status(404).send("Item not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
