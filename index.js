const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mainRoutes = require("./routes/main");
const itemRoutes = require("./routes/items")

// Middleware to parse JSON
app.use(express.json());

app.use("/", mainRoutes);
app.use("/items", itemRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
