const JWT = require("jsonwebtoken");

exports.genToken = (_id, isAdmin, userId, req, res) => {
  let token = JWT.sign({ _id, isAdmin, userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });
  if (!token) {
    res.status(400).json({ mess: "token genration failed" });
  }
  // res.header("token", token).
  res.status(200);
  return token;
};

// exports.jwtVerify = async (req, res, next) => {
//   try {
//     console.log("jwt verify called");
//     let REQ_TOKEN = req.header("auth-token");
//     if (!REQ_TOKEN) {
//       return res.status(400).send("access denied");
//     }
//     VERIFY_TOKEN = JWT.verify(REQ_TOKEN, SECRET_KEY);

//     req.user = VERIFY_TOKEN;
//     console.log("user " + VERIFY_TOKEN);
//     next();
//   } catch (err) {
//     console.log(err);
//     res.send("token varify fail in catch");
//     return;
//   }
// };
