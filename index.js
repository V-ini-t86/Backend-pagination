const express = require("express");
const paginatedResults = require("./paginated");
const User = require("./models/User.schema");
require("dotenv").config();
require("./conn");

const app = express();
app.use(express.json());

app.get("/users", paginatedResults(User), (req, res) => {
  res.status(200).json(res.result);
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}....`);
});
