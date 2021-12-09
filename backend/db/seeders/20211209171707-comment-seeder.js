'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Comments', [
     {
     userId: 2,
     checkinId: 1,
     comment: 'I love this place too!'
   },
   {
    userId: 1,
    checkinId: 1,
    comment: 'I come here every morning before work'
  },
  {
    userId: 1,
    checkinId: 2,
    comment: 'Have you tried their organic farm-to-table non-GMO soy alternative green tea chai latte?'
  },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
