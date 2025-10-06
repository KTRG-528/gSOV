const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const contracts = sequelize.define(
    'contracts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

contract_title: {
        type: DataTypes.TEXT,

      },

start_date: {
        type: DataTypes.DATE,

      },

end_date: {
        type: DataTypes.DATE,

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

  contracts.associate = (db) => {

    db.contracts.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.contracts.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return contracts;
};

