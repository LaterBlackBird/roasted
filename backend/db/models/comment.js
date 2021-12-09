'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false},
    checkinId: {
      type: DataTypes.INTEGER,
      allowNull: false},
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Checkin, { foreignKey: 'checkinId' })
    Comment.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Comment;
};
