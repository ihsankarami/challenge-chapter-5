'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userGame.hasOne(models.userBio), userGame.hasMany(models.userGameHistory);
    }
  }
  userGame.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'userGame',
    }
  );
  return userGame;
};
