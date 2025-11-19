'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bankAccounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: DataTypes.UUIDV4
      },
      userID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {model: "Users", key: "id"},
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      bankName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Horizon'
      }, 
      accountNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }, 
      accountType: {
        type: Sequelize.ENUM('savings', 'checking'),
        allowNull: false
      },
      balance: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0.00
      }, 
      curreency: {
        type: Sequelize.STRING,
        defaultValue: 'USD'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bankAccounts');
  }
};