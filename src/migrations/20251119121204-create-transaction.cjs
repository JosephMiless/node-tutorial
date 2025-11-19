'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
      sourceAccount: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'bankAccounts', key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      }, 
      destinationAccount: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: "bankAccounts",
          key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      }, recipientEmail: {
        type: Sequelize.STRING,
        allowNull: false
      }, 
      note: {
        type: Sequelize.STRING,
      }, 
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      }, 
      category: {
        type: Sequelize.ENUM('deposit', 'withdrawal', 'transfer'),
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
    await queryInterface.dropTable('transactions');
  }
};