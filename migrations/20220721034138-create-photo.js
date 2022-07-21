"use strict";
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("Photos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      like: {
        type: Sequelize.INTEGER,
      },
      view: {
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
        },
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Photos");
  },
};
