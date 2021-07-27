// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

// set up fields and rules for Product model
ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER, // integer value
      allowNull: false, // doesn't allow null values
      primaryKey: true, // set as a primary key
      autoIncrement: true // uses auto increment
    },
    product_id: {
      type: DataTypes.INTEGER, // integer value
      references: {
        model: 'product', // This references the `product` model, which we set in `Product.js` as its `modelName` property
        key: 'id' //takes product id
      }
    },
    tag_id: {
      type: DataTypes.INTEGER, // integer value
      references: {
        model: 'tag', // This references the `tag` model, which we set in `Tag.js` as its `modelName` property
        key: 'id' // takes tag id
      }
    } 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;