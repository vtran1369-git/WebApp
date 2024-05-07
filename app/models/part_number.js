const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('part_number', {
    idpart_number: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    part_num: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "part_number_UNIQUE"
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    config1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    config2: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    config3: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    created_dt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'part_number',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idpart_number" },
        ]
      },
      {
        name: "idpart_number_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idpart_number" },
        ]
      },
      {
        name: "part_number_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "part_num" },
        ]
      },
    ]
  });
};
