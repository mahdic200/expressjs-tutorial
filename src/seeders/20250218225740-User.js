'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let users = [];
   const genPhone = () => {
      let result = '';
      const chars = '0123456789';
      for (let i = 0; i < 9; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return "09" + result;
    };
   for (let i = 0; i < 100; i++) {
    users.push({
      first_name: "user fname " + i,
      last_name: "user lname " + i,
      phone: genPhone(),
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    })
   }
   return queryInterface.bulkInsert('users', users);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
