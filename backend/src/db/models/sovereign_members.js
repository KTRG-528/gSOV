const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const sovereign_members = sequelize.define(
    'sovereign_members',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

name: {
        type: DataTypes.TEXT,

      },

identity_number: {
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

  sovereign_members.associate = (db) => {

    db.sovereign_members.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.sovereign_members.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return sovereign_members;
};

