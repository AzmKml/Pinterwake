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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Title cannot be empty` },
        }
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Image cannot be empty` },
        }
      },
      like: {
        type: DataTypes.INTEGER
      },
      view: {
        type: DataTypes.INTEGER
      },
      UserId: {
        type: DataTypes.INTEGER
      },
      CategoryId: {
        type: DataTypes.INTEGER
      },
    },
    {
      sequelize,
      modelName: "Photo",
    }
  );
  Photo.beforeValidate((user, options) => {
    user.like = 0
    user.view = 0
  })
  return Photo;
};
