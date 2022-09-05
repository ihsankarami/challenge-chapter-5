'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userBios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userGameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'userGames',
          key: 'id',
        },
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
      },
      birthPlace: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userBios');
  },
};
