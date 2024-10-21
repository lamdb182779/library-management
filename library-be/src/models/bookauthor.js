'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookAuthor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookAuthor.init({
    bookId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    authorId: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'BookAuthor',
    timestamps: false // Có thể tắt timestamps nếu không cần
  });
  return BookAuthor;
};