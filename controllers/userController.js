const UserSchema = require("../models/userModels");
const mongoose = require("mongoose");
const { UnauthenticatedError, BadRequestError } = require("../errors/index");

// updated : 21-03-2024

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const { email, password } = req.params;
    if (!email || !password || !password.length >= 6) {
      return res.status(400).json({ success: false, mess: "field missing" });
    }
    const userExists = await UserSchema.findOne({ email });
    if (!userExists) {
      throw new UnauthenticatedError("User Not Exists");
    }
    // let compare = bcrypt.compareSync(password, userExists.password);
    const compare = userExists.comparePassword(password);
    if (!compare) {
      throw new UnauthenticatedError("Password not match");
    }

    const Token = userExists.createJWT(); //27-03-23
    userExists.token = Token;
    await userExists.save();
    console.log(userExists.token);
    res
      .status(200)
      .json({ name: userExists.firstName, token: userExists.token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

// updated : 21-03-2024
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const { email, password } = req.params;
    if (!email || !password || !password.length >= 6) {
      // return res.status(400).json({ mess: "feild is invalid or missing" });
      throw new UnauthenticatedError("feild is invalid or missing");
    }
    // console.log(req.body);
    console.log("hi");

    const userExists = await UserSchema.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ success: false, mess: "already a user" });
    } else {
      // const hashedPass = await bcrypt.hash(password, 10);
      //create
      const user = await UserSchema.create({
        email: email,
        password,
      });
      const Token = user.createJWT(user._id);
      console.log(Token);
      if (!user) {
        throw new BadRequestError("user not created");
      } else {
        return res.status(200).json({
          _id: user._id,
          email: user.email,
          token: Token,
        });
      }
    }
  } catch (error) {
    res.status(400).json(`hi its ${error}`);
    console.log(error);
  }
};
