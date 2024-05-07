const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mfc_cal_registry', {
    IDmfcCal: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    IDmfcRegistry: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    IDworkOrder: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    IDcalDATrepo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    CertNumber: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      unique: "CertNumber_UNIQUE"
    },
    calDTG: {
      type: DataTypes.DATE,
      allowNull: true
    },
    IDpeople: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    compassUsrName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    IDpplQA: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    opSignDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    qaSignDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    IDclient: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    IDcust: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    custGUID: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    IDtestRef: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    IDtestBloc: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    stationName: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    testRefRange: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    dutFlowRange: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    dutOutputRange: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    dutTolerance: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    procGas: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    testGas: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    suppPress: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    KFactor: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    dutAddress: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    WOnum: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    asFoundLeft: {
      type: DataTypes.ENUM('FOUND','LEFT','FOUND/LEFT'),
      allowNull: true,
      defaultValue: "LEFT"
    },
    foundOutTol: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    calDataPoints: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mfc_cal_registry',
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
        name: "IDdatFile_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDmfcCal" },
        ]
      },
      {
        name: "CertNumber_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CertNumber" },
        ]
      },
    ]
  });
};
