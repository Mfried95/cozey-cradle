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

// find bookings by id

app.post("/api/products/:id/bookings", async (req, res) => {
  try {
    const database = client.db("cozeycradle");
    const bookings = database.collection("bookings");

    const bookingId = req.params.id; // Get the product ID from the request parameters

    const booking = await bookings.findOne({ _id: new ObjectId(bookingId) }); // Find the product by ID

    console.log("BOOKINGID", bookingId, booking);

    if (booking) {
      res.json(booking); // Return the product as JSON response
    } else {
      res.status(404).json({ error: "Booking not found" }); // Product with the specified ID was not found
    }
  } catch (error) {
    console.error("Failed to fetch booking from the database:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch booking from the database" });
  }
});

// when user makes a booking

app.post("/api/bookings", async (req, res) => {
  try {
    const database = client.db("cozeycradle");
    const bookings = database.collection("bookings");

    const newBooking = req.body; // Get the new booking data from the request body

    const result = await bookings.insertOne(newBooking); // Insert the new booking into the database

    res.json(result.ops[0]); // Return the new booking as JSON response
  } catch (error) {
    console.error("Failed to insert booking into the database:", error);
    res.status(500).json({ error: "Failed to insert booking into the database" });
  }
});

// edit bookings by id

app.put("/api/bookings/:id", async (req, res) => {
  try {
    const database = client.db("cozeycradle");
    const bookings = database.collection("bookings");

    const bookingId = req.params.id; // Get the booking ID from the request parameters
    const updatedBookingData = req.body; // Get the updated booking data from the request body

    const booking = await bookings.findOne({ _id: new ObjectId(bookingId) }); // Find the booking by ID

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" }); // Booking with the specified ID was not found
    }

    // Update the booking document with the new data
    const updatedBooking = await bookings.findOneAndUpdate(
      { _id: new ObjectId(bookingId) },
      { $set: updatedBookingData },
      { returnOriginal: false }
    );

    res.json(updatedBooking); // Return the updated booking as JSON response
  } catch (error) {
    console.error("Failed to update booking in the database:", error);
    res.status(500).json({ error: "Failed to update booking in the database" });
  }
});

// delete bookings by id

app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const database = client.db("cozeycradle");
    const bookings = database.collection("bookings");

    const bookingId = req.params.id; // Get the booking ID from the request parameters

    const booking = await bookings.findOne({ _id: new ObjectId(bookingId) }); // Find the booking by ID

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" }); // Booking with the specified ID was not found
    }

    // Delete the booking from the database
    await bookings.deleteOne({ _id: new ObjectId(bookingId) });

    res.json({ message: "Booking deleted successfully" }); // Return a success message as JSON response
  } catch (error) {
    console.error("Failed to delete booking from the database:", error);
    res.status(500).json({ error: "Failed to delete booking from the database" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectDb();
});
