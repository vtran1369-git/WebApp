const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const WO = sequelize.define('wo_registry', {
    id_wo_registry: {
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
    wo_num: {
      type: DataTypes.STRING(15),
      allowNull: true,
      comment: "Actual work order number. Example: 'WO15199'."
    },
    qty: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "Quantity ordered.",
    },
    date_req: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Date Required. Format is YYYY-MM-DD"
    },
    status: {
      type: DataTypes.STRING(8),
      allowNull: true,
      comment: "Work order status variable. It is used to communicate to the work flow tracking software the state of completion the work order. {NEW, TEST, QC, CLOSED}"
    },
    id_user_registry: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    instructions: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    agilePartNum: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'wo_registry',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_wo_registry" },
        ]
      },
      {
        name: "id_wo_registry_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_wo_registry" },
        ]
      },
    ]
  });
  return WO;
}

