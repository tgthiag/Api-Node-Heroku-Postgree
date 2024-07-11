const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/",(request, response) => {response.send("Hello world, ffrom heroku")});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});