const Sequelize = require('sequelize');
const { sequelize } = require('../config/db.config.js');
const db = require('../config/db.config.js');
const { Op } = require('sequelize')

const MFCCal = db.mfc_cal_registry;
const MFC = db.mfc_registry;
const ADDR = db.addresses;
const INT_CUST = db.IntuitiveCustomer;
const CERT = db.Certification;

async function getDATA (){ 
    MFCCal.findAll({
        LIMIT: 2,
        // where: { [Op.and]: Sequelize.literal(`calDTG > NOW() - INTERVAL (1) MONTH `)},
        attribute: [['IDmfcCal', 'CalID'], ['WOnum', 'WO'], ['calDTG', 'CalDTG']],
        include: { model: MFC, attribute: ['IDmfc', 'MFCID']},
        require: true
    })
    .then( result => {
        console.log("result: ", JSON.stringify(result, null, 2))
        return result;
    })
    }
console.log("print result: ", getDATA())

