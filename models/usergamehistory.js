'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userGameHistory.belongsTo(models.userGame, {});
    }
  }
  userGameHistory.init(
    {
      userGameId: DataTypes.INTEGER,
      score: DataTypes.ENUM('win', 'lose', 'draw'),
      time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'userGameHistory',
    }
  );
  return userGameHistory;
};
