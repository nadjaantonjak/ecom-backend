// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // An `id` is automatically created by Sequelize,...
    // ...though best practice would be to define the primary key ourselves
    id: {
      type: DataTypes.INTEGER, // integer value
      allowNull: false, // doesn't allow null values
      primaryKey: true, // set as a primary key
      autoIncrement: true // uses auto increment
    },
    product_name: {
      type: DataTypes.STRING, // string
      allowNull: false // doesn't allow null values
    },
    price: {
      type: DataTypes.DECIMAL, // can take decimal value
      allowNull: false, // doesn't allow null values
      validate: { //validate decimal value
        isDecimal: true
      }
    },
    stock: {
      type: DataTypes.INTEGER, // integer value
      allowNull: false, // doesn't allow null values
      defaultValue: 10, //set 10 as a default value for stock
      Validate: { //validate decimal value
        isNumeric: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER, // integer value
      references: {
        model: 'category', // This references the `category` model, which we set in `Categogy.js` as its `modelName` property
        key: 'id' //takes category id
      }
    }
  },
  {
    sequelize, // Link to database connection
    timestamps: false, // Set to false to remove `created_at` and `updated_at` fields
    freezeTableName: true, // Prevent sequelize from renaming the table
    underscored: true, // Will add 'underscore' between two words in a table column heading
    modelName: 'product',
  }
);

module.exports = Product;