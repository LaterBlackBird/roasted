'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Coffees', [
      {
        userId: 1,
        name: 'Honeymoon Mocha',
        description: 'Honey and white chocolate - a drink for lovers',
        imageUrl: 'https://images.unsplash.com/photo-1540620723565-7e32b1e40e94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
      },
      {
        userId: 1,
        name: 'Candy Pecan Latte',
        description: 'Butter pecan, brown sugar, and cinnamon - a southern staple',
        imageUrl: 'https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Coffees', null, {});
  }
};
