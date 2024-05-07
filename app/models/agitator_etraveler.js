const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('agitator_etraveler', {
    idagitator_etraveler: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    wo_num: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    serial_num: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    model_num: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    model_rev: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    po_num: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    tech_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    tech_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    customer: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    motor_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    motor_sn: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    motor_turn_cw_ccw: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    run_entire_range: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    prod_sn_labels_attached: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    supplier_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    opID: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true
    },
    opDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    qaID: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true
    },
    qaDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    finalQAID: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true
    },
    finalQADate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    editorID: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    editorDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    signed: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "NEW"
    }
  }, {
    sequelize,
    tableName: 'agitator_etraveler',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idagitator_etraveler" },
        ]
      },
    ]
  });
};
