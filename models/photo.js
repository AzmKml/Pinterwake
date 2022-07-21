"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Photo.belongsTo(models.User);
      Photo.belongsTo(models.Category);
    }
  }
  Photo.init(
    {
      title: DataTypes.STRING,
      imageUrl: DataTypes.STRING.BINARY,
      like: DataTypes.INTEGER,
      view: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Photo",
    }
  );
  return Photo;
};
