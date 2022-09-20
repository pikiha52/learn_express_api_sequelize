'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employe_name: {
        type: Sequelize.STRING(100),
      },
      employe_role: {
        type: Sequelize.ENUM('engineer', 'hrd', 'analis'),
      },
      employe_phone_number: {
        type: Sequelize.STRING(20),
      },
      employe_address: {
        type: Sequelize.STRING(225)
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
    await queryInterface.dropTable('Employes');
  }
};