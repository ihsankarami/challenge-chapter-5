'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'userBios',
      [
        {
          userGameId: 1,
          dateOfBirth: '1990-02-10 ',
          birthPlace: 'London',
          gender: 'male',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userGameId: 2,
          dateOfBirth: '1989-06-02',
          birthPlace: 'Dublin',
          gender: 'female',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userGameId: 3,
          dateOfBirth: '2001-10-11',
          birthPlace: 'Chicago',
          gender: 'male',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('userBios', null, {});
  },
};
