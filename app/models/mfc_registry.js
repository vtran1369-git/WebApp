const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mfc_registry', {
    IDmfc: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    dtgAdded: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    lastCalDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    calDueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    IDmfr: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    custID: {
      type: DataTypes.STRING(25),
      allowNull: true,
      comment: "Customer ID input from DAT file.  COMPASS Software: user should copy and paste 'Original ID' to the input 'Customer ID' on the 'Configure DUT' screen before executing 8-point calibration."
    },
    mfrDevID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    model: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    sn: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('STOCK','INACTIVE','ACTIVE','IN PROC'),
      allowNull: true,
      defaultValue: "IN PROC"
    },
    comment: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    woID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    IDcertMaterial: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mfc_registry',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDmfc" },
        ]
      },
      {
        name: "IDmfc_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDmfc" },
        ]
      },
      {
        name: "physIdentity",
        unique: false,
        using: "BTREE",
        fields: [
          { name: "custID" },
          { name: "mfrDevID" },
          { name: "sn" },
        ]
      },
    ]
  });
};
