const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// GET route to fetch all items
router.get("/", itemsController.getAllItems);

// GET route to fetch a specific item
router.get("/:id", itemsController.getItemById);

// POST route to create a new item
router.post("/", itemsController.createItem);

// PUT route to update an existing item
router.put("/:id", itemsController.updateItem);

// DELETE route to delete an item
router.delete("/:id", itemsController.deleteItem);

module.exports = router;
