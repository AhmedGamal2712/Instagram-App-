const multer = require("multer");
const path= require("path")
const fs= require("fs")

function uploadData(customPath) {
    if (!fs.existsSync(path.join(__dirname, `../uploads/${customPath}`))) {
      // ../uploads/${customDest => ../uploads/user/profilePic
      fs.mkdirSync(path.join(__dirname, `../uploads/${customPath}`), { recursive: true });
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, path.join(__dirname, `../uploads/${customPath}`));
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        req.fileURL = `uploads/${customPath}`;
        cb(null, uniqueSuffix);
      },
    });
  // filter data
    const upload = multer({ storage: storage });

    return upload
}


module.exports = uploadData;