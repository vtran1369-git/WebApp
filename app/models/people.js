const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('people', {
    IDpeople: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    userName: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    pwd: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    fob: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "Blowfish"
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    v_code: {
      type: DataTypes.CHAR(2),
      allowNull: true,
      defaultValue: "A1"
    },
    signature: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    active: {
      type: DataTypes.ENUM('ACTIVE','INACTIVE'),
      allowNull: false,
      defaultValue: "ACTIVE"
    },
    IDteam: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    username2: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    password: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "user"
    },
    webapp: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
      allowNull: false,
      defaultValue: "INACTIVE"
    }
  }, {
    sequelize,
    tableName: 'people',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDpeople" },
        ]
      },
      {
        name: "IDpeople_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDpeople" },
        ]
      },
    ]
  });
};
