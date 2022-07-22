"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Profile } = require("../models");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Photo);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `username cannot be empty` },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `email cannot be empty` },
          isEmail: { msg: `this email is not a valid email` },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `password cannot be empty` },
        },
      },
      role: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: { msg: `role cannot be empty` },
        },
      },
    },
    {
      hooks: {
        beforeValidate: (user, option) => {
          user.role = false;
        },
        beforeCreate: (user, option) => {
          //password bcryptjs
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(user.password, salt);
          user.password = hash;
          //add default profile:
          const data = {
            name: "Foo Bar",
            dateOfBirth: user.CreatedAt,
            gender: "Male",
            bio: "Lorem Ipsum",
            UserId: user.id,
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
          };
          Profile.create(data);
        },
        afterCreate: (user, option) => {
          delete user.password;
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
