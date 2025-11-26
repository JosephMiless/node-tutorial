'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: DataTypes.UUIDV4
      }, 
      sourceAccount: {
        type: Sequelize.STRING,
        references: {model: "bankAccounts", key: 'id'},
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      }, 
      destinationAccount: {
        type: Sequelize.STRING,
        references: {model: "bankAccounts", key: 'id'},
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      }, 
      recipientEmail: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      }, amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      }, 
      status: {
        allowNull: false,
        type: Sequelize.ENUM('processing', 'success', 'failed'),
        defaultValue: 'processing'
      }, 
      category: {
        type: Sequelize.ENUM("deposit", "withdrawal", "transfer"),
        allowNull: false
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
    await queryInterface.dropTable('Transactions');
  }
};