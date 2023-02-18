"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tutorials", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: new Sequelize.DataTypes.STRING(128),
        allowNull: false,
      },
      videoURL: {
        type: new Sequelize.DataTypes.STRING(128),
        allowNull: false,
      },
      description: {
        type: new Sequelize.DataTypes.STRING(128),
        allowNull: false,
      },
      publishedStatus: {
        type: new Sequelize.DataTypes.STRING(256),
      },
      createdAt: {
        type: new Sequelize.DataTypes.DATE(),
      },
      updatedAt: {
        type: new Sequelize.DataTypes.DATE(),
      },
      deletedAt: {
        type: new Sequelize.DataTypes.DATE(),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("tutorials");
  },
};
