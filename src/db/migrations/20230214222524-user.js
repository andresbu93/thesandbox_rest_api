"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: new Sequelize.DataTypes.STRING(128),
        allowNull: false,
      },
      lastName: {
        type: new Sequelize.DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: new Sequelize.DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      password: {
        type: new Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      role: {
        type: Sequelize.DataTypes.ENUM,
        values: ["ADMIN", "USER"],
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
