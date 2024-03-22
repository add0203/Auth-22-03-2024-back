const express = require("express");
const Router = express.Router();
require("dotenv").config();
const { Auth } = require("../middleware/authentication");

const { register, signIn } = require("../controllers/userController");

Router.route("/register").post(register);
Router.route("/sign-in").post(signIn);

module.exports = Router;
