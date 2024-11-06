'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookReader extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookReader.init({
    bookId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    readerId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    startedDate: DataTypes.DATE,
    expiredDate: DataTypes.DATE,
    isExtended: DataTypes.BOOLEAN,
    isReturned: DataTypes.BOOLEAN,
    returnedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BookReader',
    hooks: {
      beforeUpdate: (bookReader, options) => {
        if (bookReader.changed('isReturned') && bookReader.isReturned === true) {
          bookReader.returnedDate = new Date(); // Gán thời gian hiện tại cho returnedDate
        }
      }
    },
  });
  return BookReader;
};