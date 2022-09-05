'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'userGameHistories',
      [
        {
          userGameId: 1,
          score: 'win',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userGameId: 2,
          score: 'win',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userGameId: 3,
          score: 'lose',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('userGameHistories', null, {});
  },
};
