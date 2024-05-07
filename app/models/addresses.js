const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addresses', {
    id_addresses: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    addr_num: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    addr_street_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    addr_suite_num: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    zip_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'addresses',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_addresses" },
        ]
      },
      {
        name: "idaddresses_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_addresses" },
        ]
      },
    ]
  });
};
