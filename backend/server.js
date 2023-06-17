const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());

// Add the body parsing middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

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

// get bookings 
app.get("/bookings", async (req, res) => {
  try {
    const database = client.db("cozeycradle");
    const bookings = database.collection("bookings");

    const booking = await bookings.find().toArray(); // Retrieve all bookings

    if (booking.length > 0) {
      res.json(booking); // Return the bookings as JSON response
    } else {
      res.status(404).json({ error: "No bookings found" }); // No bookings found in the database
    }
  } catch (error) {
    console.error("Failed to fetch bookings from the database:", error);
    res.status(500).json({ error: "Failed to fetch bookings from the database" });
  }
});

// post new booking 
app.post("/bookings", async (req, res) => {
  console.log("REQUEST BODY", req.body);
  try {
    const database = client.db("cozeycradle");
    const bookings = database.collection("bookings");
    const products = database.collection("products");
    const { productID, status, startDate, endDate, productName, price } = req.body; // Get the booking data from the request body

    const newBooking = {
      productID,
      status,
      startDate,
      endDate,
      productName,
      price
    };

    const result = await bookings.insertOne(newBooking); // Insert the new booking into the collection
    const allOrders = await bookings.find().toArray();
    // const product = await products.findOne({ _id: new ObjectId(productID) }); // Find the product by ID
    console.log(result);

    if (result.acknowledged) {
      res.status(201).json({
        success: true,
        message: 'Created new booking',
        data : {
          allOrders: allOrders,
          // product: product,

        }
      }); // Return the created booking as JSON response
    } else {
      res.status(400).json({ error: "Failed to create booking" }); // Failed to create the booking
    }
  } catch (error) {
    console.error("Failed to create booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});


// edit bookings by id

app.put("/api/bookings", async (req, res) => {
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
