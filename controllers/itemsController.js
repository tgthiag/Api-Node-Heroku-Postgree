const pool = require('../db');

const getAllItems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getItemById = async (req, res) => {
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
};

const createItem = async (req, res) => {
  try {
    const result = await pool.query('INSERT INTO items (name, price) VALUES ($1, $2) RETURNING *', [req.body.name, req.body.price]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateItem = async (req, res) => {
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
};

const deleteItem = async (req, res) => {
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
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};
