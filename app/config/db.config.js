const { Sequelize, QueryTypes } = require('sequelize');
const mssql = require('mssql');
/* const env = {
  DB: 'pegasus',
  USER_NAME: 'root',
  PASSWORD: '4O1iu6OTT92|1Y',
  HOST: '148.62.4.130',
  DIALECT: 'mysql',
  MAX: 15,
  MIN: 0,
  ACQUIRE: 30000,
  IDLE: 10000
 };
 */

 /*added MSSQL used in INTUITIVE DB */
  const INT_sequelize = new Sequelize('iERP90_PROD','appEWOI','mSf!zur@01', {
    host: 'USSC2-ERP-DB-P.amer.thermo.com',
    dialect: 'mssql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
   },
  } )

  /***** test INTUITIVE DB ***** */
/* 
  INT_sequelize.query(`SELECT TOP 10 * FROM dbo.JM_MFC_CDM_WorkOrders`, { type: QueryTypes.SELECT })
  .then(res => {
    console.log(res)
  }) */
  
  const env = process.env
  // console.log("env: ", env)
  const sequelize = new Sequelize(env.DB, env.USER_NAME, env.PASSWORD, {
    host: env.HOST,
    dialect: env.DIALECT,
    pool: {
      max: parseInt(env.MAX),
      min: parseInt(env.MIN),
      acquire: parseInt(env.ACQUIRE),
      idle: parseInt(env.IDLE)
    }
  })

  const db = {};
  //Added INTUITIVE DB 4-10-2024
  db.INT_sequelize = INT_sequelize;
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.sequelize.sync({force: false}).then(() => {
    console.log('stop drop from db.config  { force: false }');
  }); 
  
  db.Users = require('../models/user_registry.js')(sequelize, Sequelize);
  db.WO = require('../models/wo_registry.js')(sequelize, Sequelize);
  db.Customers = require('../models/customers.js')(sequelize, Sequelize);
  db.mfc_cal_registry = require('../models/mfc_cal_registry')(sequelize, Sequelize);
  db.mfc_registry = require('../models/mfc_registry')(sequelize, Sequelize);
  db.addresses = require("../models/addresses")(sequelize, Sequelize)
  db.Certification = require('../models/certification.js')(sequelize, Sequelize);
  db.people = require('../models/people')(sequelize, Sequelize)
  db.FSN = require('../models/finesse_serial_number.js')(sequelize, Sequelize);
  db.user = require('../models/user.model.js')(sequelize, Sequelize);
  db.role = require('../models/role.model.js')(sequelize, Sequelize);
  db.FINESSE_TEST = require('../models/test_event_registry')(sequelize, Sequelize);
  // db.IntuitiveCustomer = require('../models/IntuitiveCustomer')(sequelize, Sequelize)
  db.AGIT_ETRAV = require('../models/agitator_etraveler')(sequelize, Sequelize);

  db.WO.hasOne(db.Users, {foreignKey: 'id_user_registry', sourceKey: 'id_wo_registry'});
  db.mfc_registry.hasOne(db.addresses, {foreignKey: 'id_addresses', sourceKey: 'IDmfr'});
  db.mfc_cal_registry.hasOne(db.people, {foreignKey: 'IDpeople', sourceKey: 'IDpeople'});

  db.WO.hasMany(db.FSN, {foreignKey: "id_wo_registry"});
  db.FSN.belongsTo(db.WO, {foreignKey: "id_wo_registry"})

  /* db.mfc_cal_registry.hasOne(db.mfc_registry, {foreignKey: "IDmfcRegistry"})
  db.mfc_cal_registry.hasOne(db.IntuitiveCustomer, {foreignKey: "custGUID"})
  db.mfc_registry.hasOne(db.addresses, {foreignKey: "IDmfr"})
  db.mfc_registry.hasOne(db.Certification, {foreignKey: "IDcertMaterial"}) */

  // db.role.hasMany(db.user, { foreignKey: 'roleId'});
  // db.user.belongsTo(db.role)

  /* db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
  db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  }); */

  db.ROLES = ["user", "admin"];

  module.exports = db;