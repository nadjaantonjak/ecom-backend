// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// import our database connection from config.js
const sequelize = require('../config/connection.js');

// Initialize Product model (table) by extending off Sequelize's Model class
class Tag extends Model {}

// set up fields and rules for Product model
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER, // integer value
      allowNull: false, // doesn't allow null values
      primaryKey: true, // set as a primary key
      autoIncrement: true // uses auto increment
    },
    tag_name: {
      type: DataTypes.STRING, // string
    }  
  },
  {
    sequelize, // Link to database connection
    timestamps: false, // Set to false to remove `created_at` and `updated_at` fields
    freezeTableName: true, // Prevent sequelize from renaming the table
    underscored: true, // Will add 'underscore' between two words in a table column heading
    modelName: 'tag',
  }
);

module.exports = Tag;