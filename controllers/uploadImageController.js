const path = require("path");
const formidable = require("formidable");
// cloudnary step -3
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// exports.uploadPostImage = async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.files.photo, {
//       use_filename: true,
//       folder: "file-upload",
//     });
//     fs.unlinkSync(req.files.photo);
//     return res
//       .status(StatusCodes.OK)
//       .json({ photo: { src: result.secure_url } });
//   } catch (error) {
//     console.log(error);
//     res.send(error);
//   }
// };

// changes in 22 -0- 2024
exports.uploadPostImage = async (req, res) => {
  //console.log(req.body);
  try {
    const file = req.files.photo;
    if (!file) {
      throw new UnauthenticatedError("feild is invalid ");
    }

    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      console.log("yes");
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
