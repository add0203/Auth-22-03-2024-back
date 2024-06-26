const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/dbConnection");
//Routes import
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
// const adminRoutes = require("./routes/adminRoutes");

//errror handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//fileUploader - cloudnary step-1
//
const fileUpload = require("express-fileupload");



const corsOptions = {
  // origin: "https://auth-22-03-2024-back.onrender.com",
   origin:[ "http://127.0.0.1:5501", "https://auth-22-03-24-add0203s-projects.vercel.app","https://auth-22-03-24.vercel.app"]
};

app.use(cors(corsOptions));

//Auth middleware
const { Auth } = require("./middleware/authentication");
//middleware invoke
app.use(express.json());
// app.use(fileUpload()); cloudnary step-2
app.use(fileUpload({ useTempFiles: true }));

// cloudnary step - 3
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//route
app.use("/user", userRoutes);
app.use("/post", Auth, postRoutes);
// app.use("/admin", Auth, adminRoutes);
// app.use("/api/v1/user", userRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// function to start the server and connect DB

const start = async () => {
  //DB
  connectDB(process.env.DB_LINK);
  //server
  app.listen(process.env.PORT, () => {
    console.log(`server is running at http://localhost:${process.env.PORT}`);
  });
};

start();
