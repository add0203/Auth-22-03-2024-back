const express = require("express");

const { uploadPostImage } = require("../controllers/uploadImageController");

let postRouter = express.Router();

//cloudnary
postRouter.route("/uploadimage").post(uploadPostImage);

module.exports = postRouter;
