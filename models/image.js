'use strict';
module.exports = (sequelize, DataTypes) => {
  var Image = sequelize.define('Image', {
    localPath: DataTypes.STRING,
    bucketPath: DataTypes.STRING,
    uploaded: DataTypes.DATE
  });

  Image.associate = function(models) {
    models.Image.belongsTo(models.Event, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: 'event_id'
      }
    });
  };

  return Image;
  
};