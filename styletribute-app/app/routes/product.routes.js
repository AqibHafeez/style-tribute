var multipart = require("connect-multiparty");
var multipartMiddleware = multipart({ uploadDir: process.env.UPLOAD_PATH });

module.exports = (app) => {
  const products = require("../controllers/product.controller.js");
  var router = require("express").Router();
  // Create a new Product
  router.post("/create", multipartMiddleware, products.create);
  // Retrieve all Products
  router.get("/getAll", products.findAll);
  app.use("/api/products", router);
};
