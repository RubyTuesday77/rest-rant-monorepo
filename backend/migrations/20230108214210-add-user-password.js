'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Add password column to table
    return queryInterface.addColumn("users", "password_digest", {
      type: Sequelize.DataTypes.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {

    // Remove password column from table
    return queryInterface.removeColumn("users", "password_digest");
  }
};
