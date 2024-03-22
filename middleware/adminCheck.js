const { StatusCodes } = require("http-status-codes");

exports.adminCheck = async (req, res, next) => {
  const adminCheck = req.user.isAdmin;
  if (!adminCheck) {
    res.status(StatusCodes.UNAUTHORIZED).json({ mess: "UNAUTHORIZED" });
  } else {
    next();
  }
};
