'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coffee = sequelize.define('Coffee', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false},
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: DataTypes.STRING
  }, {});
  Coffee.associate = function(models) {
    // associations can be defined here
    Coffee.belongsTo(models.User, { foreignKey: 'userId' });
    Coffee.hasMany(models.Checkin, { foreignKey: 'drinkId' })
  };
  return Coffee;
};
