'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const employes = [];
    for (let i = 0; i < 50; i++) {
      employes.push({
        employe_name: `employe${i}`,
        employe_role: `analis`,
        employe_phone_number: `089388271123`,
        employe_address: `alamat employe`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('Employes', employes, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Employes', null, {
      truncate: true,
    });
  }
};
