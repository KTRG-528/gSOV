const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const dao_members = sequelize.define(
    'dao_members',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

member_name: {
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

  dao_members.associate = (db) => {

    db.dao_members.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.dao_members.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return dao_members;
};

