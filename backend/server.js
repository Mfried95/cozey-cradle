const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://cozeycradle:s2EpenbL4JpBBABN@cozeycradle.w07iyp9.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});