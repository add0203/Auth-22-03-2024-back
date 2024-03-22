const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    // required: [true, "Please Provide First Name"],
    // minLength: 3,
    // maxLength: 5,
  },
  lastName: {
    type: String,
    // required: [true, "Please Provide Last Name"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // image: {
  //   type: String,
  //   default: "",
  // },
  // images: [
  //   {
  //     type: String,
  //   },
  // ],
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    // match: [
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //   "Please Provide Valid Email",
    // ],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // reset token model

  contactNumber: Number,
  token: String,
  resetToken: Number,
  expireToken: String,
  otpChecked: {
    type: Boolean,
    default: false,
  },
  DOB: Date,
  blocked: Boolean,
  follower: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // comment,
  lastLogin: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hashSync(this.password, salt);
  console.log("pre runned");
});

//create a instance of methods
UserSchema.methods.createJWT = function async() {
  return (token = JWT.sign(
    { userId: this._id, isAdmin: this.isAdmin, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    }
  ));
};

UserSchema.methods.comparePassword = async function (enterdPassword) {
  const isMatch = await bcrypt.compare(enterdPassword, this.password);
  console.log(isMatch);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
