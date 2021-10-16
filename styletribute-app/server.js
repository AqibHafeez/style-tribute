require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );
app.use(cors());
db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

//routes
require("./app/routes/product.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
