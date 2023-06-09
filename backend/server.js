const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");

const app = express();

const port = 3000;

app.use(express.json());


mongoose.connect('mongodb+srv://cozeycradle:s2EpenbL4JpBBABN@cozeycradle.w07iyp9.mongodb.net/',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);


const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});