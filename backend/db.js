const mongoose = require('mongoose');

// const uri = "mongodb+srv://cozeycradle:s2EpenbL4JpBBABN@cozeycradle.w07iyp9.mongodb.net/";
const uri = "mongodb+srv://cozeycradle:s2EpenbL4JpBBABN@cozeycradle.w07iyp9.mongodb.net/cozeycradle?retryWrites=true&w=majority";

const connectDb = async () => {
  try {
   const connection = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
     // Sync all models
    //  await mongoose.connection.syncIndexes();
        // console.log('All models synced successfully.');
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

module.exports = connectDb;