const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

const uri = "mongodb+srv://cozeycradle:s2EpenbL4JpBBABN@cozeycradle.w07iyp9.mongodb.net/";
const client = new MongoClient(uri);

const connectDb = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

connectDb();

app.get("/movies", async(req, res) => {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    const allMovies = await movies.find().toArray();
    res.json(allMovies[0]);
  } catch (error) {
    console.error("Failed to fetch movies from the database:", error);
    res.status(500).json({ error: "Failed to fetch movies from the database" });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});