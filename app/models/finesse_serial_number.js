const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('finesse_serial_number', {
    id_finesse_serial_number: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    dtg: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    p_code: {
      type: DataTypes.CHAR(4),
      allowNull: true,
      defaultValue: "0000",
      comment: "Product code."
    },
    v_code: {
      type: DataTypes.CHAR(2),
      allowNull: true,
      defaultValue: "00",
      comment: "Vendor code."
    },
    rev: {
      type: DataTypes.STRING(25),
      allowNull: true,
      defaultValue: "0",
      comment: "This is the revision number."
    },
    dom: {
      type: DataTypes.CHAR(4),
      allowNull: true,
      defaultValue: "0000",
      comment: "Date Of Manufacture."
    },
    serial_index: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0,
      comment: "This is the serialized index."
    },
    id_wo_registry: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "Links a FSN to a WO.",
      references: {
        model: 'wo_registry',
        key: 'id_wo_registry'
      }
    },
    fsn_string: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "This is the formatted FSN string. Added to make it easier to search for a particular FSN."
    },
    status: {
      type: DataTypes.ENUM('NEW','TEST_PASS','TEST_FAIL','QA_IN_PASS','QA_IN_FAIL','QA_OUT_PASS','QA_OUT_FAIL','RETURN','VOID'),
      allowNull: true,
      defaultValue: "NEW",
      comment: "'NEW','TEST_PASS','TEST_FAIL','QA_IN_PASS','QA_IN_FAIL','QA_OUT_PASS','QA_OUT_FAIL','RETURN','VOID'"
    },
    config_code: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    IDbuild: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lastPCBsn: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "Contains the last known PCB sn associated with this FSN.  Refer to _data tables for history of associations"
    }
  }, {
    sequelize,
    tableName: 'finesse_serial_number',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_finesse_serial_number" },
        ]
      },
      {
        name: "id_finesse_serial_number_UNIQUE",
        using: "BTREE",
        fields: [
          { name: "id_finesse_serial_number" },
        ]
      },
      {
        name: "fk_finesse_serial_number_wo_registry1_idx",
        using: "BTREE",
        fields: [
          { name: "id_wo_registry" },
        ]
      },
    ]
  });
};
