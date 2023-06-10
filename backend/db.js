const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://cozeycradle:s2EpenbL4JpBBABN@cozeycradle.w07iyp9.mongodb.net/";
const client = new MongoClient(uri);

const connectDb = async () => {
  try {
    await client.connect();
    const database = client.db("sample_mflix"); // select what database to connect
    const movies = database.collection("movies"); // collection to select
    const query = { title: "Back to the Future" }; // search specific in collection
    const movie = await movies.findOne(query); // run the query
    console.log(movie); // console log the collection
  } finally {
    client.close();
  }
};

connectDb().catch(console.dir);