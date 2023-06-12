const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://cozeycradle:s2EpenbL4JpBBABN@cozeycradle.w07iyp9.mongodb.net/";
const client = new MongoClient(uri);

const connectDb = async() => {
  let connection;
  try {
    connection = await client.connect();
    const database = connection.db("cozeycradle"); // choose database
    const products = database.collection("products"); // choose collection
    
    console.log(products);
    // Perform operations on the products collection or interact with the database here

  } finally {
    if (connection) {
      connection.close();
    }
  }
};

connectDb().catch(console.dir);

