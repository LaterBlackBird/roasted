'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Coffees', [
      {
        userId: 1,
        name: 'Honeymoon Mocha',
        description: 'Honey and white chocolate - a drink for lovers'
      },
      {
        userId: 1,
        name: 'Candy Pecan Latte',
        description: 'Butter pecan, brown sugar, and cinnamon - a southern staple'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Coffees', null, {});
  }
};
