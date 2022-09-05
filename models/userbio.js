'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userBio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userBio.belongsTo(models.userGame);
    }
  }
  userBio.init(
    {
      userGameId: DataTypes.INTEGER,
      dateOfBirth: DataTypes.DATEONLY,
      birthPlace: DataTypes.STRING,
      gender: DataTypes.ENUM('male', 'female'),
    },
    {
      sequelize,
      modelName: 'userBio',
    }
  );
  return userBio;
};
