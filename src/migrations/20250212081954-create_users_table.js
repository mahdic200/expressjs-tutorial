'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('users', {
      id: {
          autoIncrement: true,
          type: Sequelize.DataTypes.BIGINT,
          primaryKey: true,
          allowNull: false,
      },
      firstName: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
      },
      lastName: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('users')
  }
};
