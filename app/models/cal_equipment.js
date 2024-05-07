const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cal_equipment', {
    IDcalEquip: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id_certification: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "Points to certification table"
    },
    AssetID: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "Michael Ellis' asset IDs.  NOT an official Finesse or Thermo asset tag."
    },
    Location: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Mfr: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Model: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Descr: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    SN: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    id_client: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    systemRemarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cal_equipment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDcalEquip" },
        ]
      },
      {
        name: "IDcalEquip_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDcalEquip" },
        ]
      },
    ]
  });
};
