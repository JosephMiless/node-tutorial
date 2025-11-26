'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("bankAccounts", "curreency", "currency");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn("bankAccounts", "currency", "cureency");
  }
};

