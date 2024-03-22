const JWT = require("jsonwebtoken");

exports.Auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(400).json({ success: false, mess: "no Token Provided" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    //attach user to the job routes
    req.user = {
      userId: decoded.userId,
      isAdmin: decoded.isAdmin,
      name: decoded.firstName,
    }; //defind in the UserModel
    next();
  } catch (error) {
    // throw new UnauthenticatedError("Authentication Invalid");
    console.log(error);
    return res
      .status(400)
      .json({ success: false, mess: "Authentication Invalid" });
  }
};
