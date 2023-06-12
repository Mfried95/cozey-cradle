const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());

const port = 3000;

const uri =
  "mongodb+srv://cozeycradle:s2EpenbL4JpBBABN@cozeycradle.w07iyp9.mongodb.net/";
const client = new MongoClient(uri);

const connectDb = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

// Find all products
app.get("/api/products", async (req, res) => {
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

// Find products by id
app.get(`/api/products/:id`, async (req, res) => {
  try {
    const database = client.db("cozeycradle");
    const products = database.collection("products");

    const productId = req.params.id; // Get the product ID from the request parameters

    const product = await products.findOne({ _id: new ObjectId(productId) }); // Find the product by ID

    console.log("PRODUCTID", productId, product);

    if (product) {
      res.json(product); // Return the product as JSON response
    } else {
      res.status(404).json({ error: "Product not found" }); // Product with the specified ID was not found
    }
  } catch (error) {
    console.error("Failed to fetch product from the database:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch product from the database" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectDb();
});
