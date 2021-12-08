'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false},
    drinkId: {
      type: DataTypes.INTEGER,
      allowNull: false},
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Checkin.associate = function(models) {
    // associations can be defined here
    Checkin.belongsTo(models.User, { foreignKey: 'userId' })
    Checkin.belongsTo(models.Coffee, { foreignKey: 'drinkId' })
  };
  return Checkin;
};
