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

    models.Event.hasMany(models.Image, 
        {  
          foreignKey: {
            allowNull: false,
            name: 'event_id'
          }
        }
    );
  };

  return Event;
};
