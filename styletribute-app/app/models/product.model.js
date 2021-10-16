module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return Product;
};
