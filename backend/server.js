const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3000;

const uri = "mongodb+srv://cozeycradle:s2EpenbL4JpBBABN@cozeycradle.w07iyp9.mongodb.net/";
const client = new MongoClient(uri);

const connectDb = async() => {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};



app.get("/api/products", async(req, res) => {
  try {
    const database = client.db("cozeycradle");
    const products = database.collection("products");
    const allProducts = await products.find().toArray();
    res.json(allProducts);
  } catch (error) {
    console.error("Failed to fetch movies from the database:", error);
    res.status(500).json({ error: "Failed to fetch movies from the database" });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectDb();
});

