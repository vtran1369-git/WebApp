const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_registry', {
    id_user_registry: {
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
    v_code: {
      type: DataTypes.CHAR(2),
      allowNull: true,
      defaultValue: "A1"
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_name: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    pass_word: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    fob_data: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      unique: "fob_data_UNIQUE"
    },
    signature: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    active: {
      type: DataTypes.ENUM('INACTIVE','ACTIVE'),
      allowNull: true,
      defaultValue: "ACTIVE"
    }
  }, {
    sequelize,
    tableName: 'user_registry',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user_registry" },
        ]
      },
      {
        name: "id_user_pw_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user_registry" },
        ]
      },
      {
        name: "fob_data_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "fob_data" },
        ]
      },
    ]
  });
};
