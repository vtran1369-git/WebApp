const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('certification', {
    id_certification: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    cert_number: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    device_description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    device_serial: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    IDcal_equipment: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    ID_hw_deployment: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    ID_cert_type: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'cert_types',
        key: 'id_cert_types'
      }
    },
    effect_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    expire_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    cert_pdf: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    externalStorage: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'certification',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_certification" },
        ]
      },
      {
        name: "id_certification_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_certification" },
        ]
      },
      {
        name: "fk_cert_certType_idx",
        using: "BTREE",
        fields: [
          { name: "ID_cert_type" },
        ]
      },
    ]
  });
};
