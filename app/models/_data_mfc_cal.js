const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('_data_mfc_cal', {
    IDmfcCal: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    IDmfcCalRegistry: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    fullScale: {
      type: DataTypes.DECIMAL(8,5),
      allowNull: true
    },
    refFlow: {
      type: DataTypes.DECIMAL(8,5),
      allowNull: true,
      comment: "May be in SCCM, or SLM.  Must look at MFCcalRegistry to determine incoming units for Reference."
    },
    dutFlow: {
      type: DataTypes.DECIMAL(8,5),
      allowNull: true,
      comment: "May be in SCCM, or SLM.  Must look at MFCcalRegistry to determine incoming units for DUT"
    },
    deltaFlow: {
      type: DataTypes.DECIMAL(8,5),
      allowNull: true
    },
    err: {
      type: DataTypes.DECIMAL(8,5),
      allowNull: true,
      comment: "Error as %FS"
    },
    dutOutput: {
      type: DataTypes.DECIMAL(8,5),
      allowNull: true,
      comment: "% flow out"
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "OK"
    }
  }, {
    sequelize,
    tableName: '_data_mfc_cal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDmfcCal" },
        ]
      },
      {
        name: "IDmfcCal_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDmfcCal" },
        ]
      },
    ]
  });
};
