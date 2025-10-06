const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const proposals = sequelize.define(
    'proposals',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

proposal_title: {
        type: DataTypes.TEXT,

      },

status: {
        type: DataTypes.ENUM,

        values: [

"Pending",

"Approved",

"Rejected"

        ],

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

  proposals.associate = (db) => {

    db.proposals.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.proposals.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return proposals;
};

