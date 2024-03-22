const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose.connect(url, {
    useUnifiedTopology: true,
    dbName: "blinkit",
  });
  console.log("DB Connected");
};

module.exports = connectDB;
