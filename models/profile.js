"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }
     honorificName(){
      let honorific = 'Mr.'
      if(this.gender === 'Female'){
        honorific = 'Mrs.'
      }
      honorific = `${honorific} ${this.name}`
      return honorific
    }
  }
  Profile.init(
    {
      name: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      gender: DataTypes.STRING,
      bio: DataTypes.TEXT,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
