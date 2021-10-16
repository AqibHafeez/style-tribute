var multipart = require("connect-multiparty");
var multipartMiddleware = multipart({ uploadDir: process.env.UPLOAD_PATH });

module.exports = (app) => {
  const products = require("../controllers/product.controller.js");
  var router = require("express").Router();
  // Create a new Product
  router.post("/create", multipartMiddleware, products.create);
  // Retrieve all Products
  router.get("/getAll", products.findAll);
  // We are currently not allowed to access files directly within docker container thats why using seprate endpoint for that.
  router.get("/uploads/:file", products.getSingleImg);
  app.use("/api/products", router);
};
