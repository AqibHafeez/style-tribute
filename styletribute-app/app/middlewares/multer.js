// This is a middlware to upload images to the docker cotainer
const multer = require("multer");
function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const DIR = process.env.UPLOAD_PATH;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //ath.resolve(__dirname, DIR)
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, makeid(16) + "_" + fileName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype === "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, and .jpeg format allowed!"));
    }
  },
});

module.exports.send = (req, res, next) => {
  return upload.single("image")(req, res, () => {
    // Remember, the middleware will call it's next function
    // so we can inject our controller manually as the next()
    if (!req.file) return res.json({ error: "Internal Server Error" });
    next();
  });
};
