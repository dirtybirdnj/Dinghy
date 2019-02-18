'use strict';
module.exports = (sequelize, DataTypes) => {

  var Event = sequelize.define('Event', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    active: DataTypes.BOOLEAN
  }, {
    tableName: 'Events',
  });

  Event.beforeCreate(event => {
    event.createdAt = new Date();
  });

  Event.associate = function (models) {

  };

  return Event;
};
