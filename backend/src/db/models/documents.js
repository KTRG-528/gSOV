const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const documents = sequelize.define(
    'documents',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

document_title: {
        type: DataTypes.TEXT,

      },

created_date: {
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

  documents.associate = (db) => {

    db.documents.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.documents.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return documents;
};

