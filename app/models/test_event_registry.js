const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test_event_registry', {
    id_test_event_registry: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    dtg: {
      type: DataTypes.DATE(3),
      allowNull: true
    },
    id_finesse_serial_number: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'finesse_serial_number',
        key: 'id_finesse_serial_number'
      }
    },
    id_wo_registry: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'wo_registry',
        key: 'id_wo_registry'
      }
    },
    id_user_registry: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    id_sw_asset_reg: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'software_asset_registry',
        key: 'id_software_asset_reg'
      }
    },
    id_test_sequence: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'sequence_repository',
        key: 'id_sequence_repository'
      }
    },
    spec_index_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'spec_index',
        key: 'id_spec_index'
      }
    },
    id_user_qa: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    qa_dtg: {
      type: DataTypes.DATE,
      allowNull: true
    },
    testMode: {
      type: DataTypes.ENUM('PROD','ENG'),
      allowNull: false,
      defaultValue: "PROD"
    },
    comments: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      defaultValue: null
    },
    test_sequence: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      defaultValue: "",
      comment: "A comma delimited list of test recipes executed for each test event"
    },
    testSocket: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'test_event_registry',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_test_event_registry" },
        ]
      },
      {
        name: "fk_test_event_registry_software_asset_registry1_idx",
        using: "BTREE",
        fields: [
          { name: "id_sw_asset_reg" },
        ]
      },
      {
        name: "fk_test_event_registry_test_recipe1_idx",
        using: "BTREE",
        fields: [
          { name: "id_test_sequence" },
        ]
      },
      {
        name: "fk_test_event_registry_spec_index1_idx",
        using: "BTREE",
        fields: [
          { name: "spec_index_id" },
        ]
      },
      {
        name: "fk_test_event_registry_finesse_serial_number1_idx",
        using: "BTREE",
        fields: [
          { name: "id_finesse_serial_number" },
        ]
      },
      {
        name: "fk_test_event_registry_wo_registry1_idx",
        using: "BTREE",
        fields: [
          { name: "id_wo_registry" },
        ]
      },
    ]
  });
};
