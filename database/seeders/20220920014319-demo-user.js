'use strict';

const passwordHash = require('password-hash');

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];
    for (let i = 1; i < 50; i++) {
      users.push({
        username: `user${i}`,
        fullname: `user${i}`,
        email: `user${i}@gmail.com`,
        password: passwordHash.generate(`password`),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {
      truncate: true
    });
  }
};
