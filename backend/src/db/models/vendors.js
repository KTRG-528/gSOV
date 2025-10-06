const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const vendors = sequelize.define(
    'vendors',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

business_name: {
        type: DataTypes.TEXT,

      },

registration_number: {
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

  vendors.associate = (db) => {

    db.vendors.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.vendors.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return vendors;
};

