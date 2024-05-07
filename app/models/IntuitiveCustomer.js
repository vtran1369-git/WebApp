const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IntuitiveCustomer', {
    custTableID: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    IntCustID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    IntCustGUID: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    custGUIDbin: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    postalCode: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'IntuitiveCustomer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "custTableID" },
        ]
      },
      {
        name: "id_cust_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "custTableID" },
        ]
      },
    ]
  });
};
