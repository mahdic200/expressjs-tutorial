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
      first_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
      },
      last_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
      },
      phone: {
          type: Sequelize.DataTypes.STRING(11),
          allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.TIME,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.TIME,
        allowNull: null,
      },
      deleted_at: {
        type: Sequelize.DataTypes.TIME,
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
