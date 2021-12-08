'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Checkins', [
      {
        userId: 1,
        drinkId: 1,
        location: 'Elevate in Mount Juliet'
      },
      {
        userId: 2,
        drinkId: 2,
        location: 'Barista Parlor in Nashville'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Checkins', null, {});
  }
};
