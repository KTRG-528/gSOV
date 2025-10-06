const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const guests = sequelize.define(
    'guests',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

guest_name: {
        type: DataTypes.TEXT,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  guests.associate = (db) => {

    db.guests.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.guests.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return guests;
};

