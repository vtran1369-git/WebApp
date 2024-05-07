const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customers', {
    id_customer: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phone_num: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    fax_num: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    }, {
    sequelize,
    tableName: 'customers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_customer" },
        ]
      },
    ]
  });
};
