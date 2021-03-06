const { Stream } = require("stream");
const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op; // don't need it at the moment
var path = require("path");
var fs = require("fs");
// Create and Save a new Product

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!",
    });
    return;
  }
  if (!req.files.image) {
    res.status(400).send({
      message: "Image is required!",
    });
    return;
  }
  const product = {
    name: req.body.name,
    image: req.files.image.path.split("/")[1],
  };
  Product.create(product)
    .then((data) => {
      res.status(200).send({
        success: true,
        message: "Product Added Successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding the Product.",
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  Product.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Products.",
      });
    });
};

exports.getSingleImg = (req, res) => {
  var filepath = path.resolve(process.env.UPLOAD_PATH, req.params.file);
  filepath = filepath.replace(/\.[^/.]+$/, ".jpeg");
  console.log(filepath);
  const r = fs.createReadStream(filepath);
  const ps = new Stream.PassThrough();
  Stream.pipeline(r, ps, (err) => {
    if (err) {
      console.log(err);
    }
  });
  ps.pipe(res);
  return;
};
