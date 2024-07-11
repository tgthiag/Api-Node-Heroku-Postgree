const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory data store (example)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// GET route to fetch items
app.get("/", (req, res) => {
  res.send("Hello world, from Heroku");
});

// GET route to fetch all items
app.get("/items", (req, res) => {
  res.json(items);
});

// GET route to fetch a specific item
app.get("/items/:id", (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// POST route to create a new item
app.post("/items", (req, res) => {
  const newItem = { id: items.length + 1, name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT route to update an existing item
app.put("/items/:id", (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// DELETE route to delete an item
app.delete("/items/:id", (req, res) => {
  const itemIndex = items.findIndex(i => i.id == req.params.id);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Item not found");
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
