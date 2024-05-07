const { Op, Sequelize, QueryTypes, json } = require('sequelize');
const { sequelize } = require('../config/db.config.js');
const db = require('../config/db.config.js');
const Chance = require("chance")
const chance = new Chance(); 
const FINESSE_TEST = db.FINESSE_TEST
// const timeStamp = require('../Utils/timeStamp.js')

const getNow = function (){
    function pad(n) {return n<10 ? "0"+n : n};
    d=new Date()
    dash="-"
    colon=":"
    return d.getFullYear()+dash+
    pad(d.getMonth()+1)+dash+
    pad(d.getDate())+" "+
    pad(d.getHours())+colon+
    pad(d.getMinutes())+colon+
    pad(d.getSeconds())
}

exports.getById= (req, res) => { 
    const id = req.params.id
    // db.sequelize.query(`CALL truFlowTraveler(:fsn)`, {replacements: {fsn: id}, multipleStatements: true, type: Sequelize.QueryTypes.SELECT})
    db.sequelize.query(`CALL truFlowTraveler_TestIdOut(:fsn)`, {replacements: {fsn: id}, multipleStatements: true, type: Sequelize.QueryTypes.SELECT})
    .then(result1 =>{
       //console.log(">>HeaderTable: ", result1[0])
       const truFlowHeader = result1[0]
       //console.log("truflowheader: ", truFlowHeader["0"])
       db.sequelize.query(`SELECT * FROM HWtable`, {multipleStatements: true, type: Sequelize.QueryTypes.SELECT})
       .then(result2 => {
            // console.log(">>HWtable: ", result2)
            db.sequelize.query(`SELECT * FROM TFPFAry`, {multipleStatements: true, type: Sequelize.QueryTypes.SELECT})
            .then(result3 => {
                // console.log(">>TFPFAry: ", result3)
                db.sequelize.query(`SELECT TestElementName AS "Test Item", SpecReference AS "Test ID", ColumnName AS Data, trav_units AS Units, LimitLo AS Min, LimitHi AS Max, failure_code AS "Pass/Fail" FROM DataTable`, {multipleStatements: true, type: Sequelize.QueryTypes.SELECT})
                .then(result4 => {
                    // console.log("dataTable: ", result4)
                    res.status(200).json({
                        status: "Successful",
                        HeaderTable: result1[0],
                        HWTable: result2,
                        PFTable: result3,
                        DataTable: result4
                    })
                })
            })
       })
    })
    .catch(error => {
        // log on console
        //console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
}

exports.getAll = (req, res) => {
    const query =  `SELECT id_finesse_serial_number AS fsnId, fsn_string AS Serial_Number, WO.wo_num AS Work_Order, LEFT(PCR.SpecName, 4) AS Product_Type, FSN.dtg AS Date, FSN.status AS Status, WO.id_wo_registry AS woId 
        FROM finesse_serial_number FSN, wo_registry WO, p_code_register PCR
        WHERE WO.id_wo_registry = FSN.id_wo_registry AND FSN.status <> "NEW" AND PCR.p_code = FSN.p_code AND LEFT(PCR.SpecName, 4) = "TFPT" ORDER BY Date DESC LIMIT 1000`

    db.sequelize.query(query, {type: QueryTypes.SELECT})
    .then(result => {
    // console.log("result: ", result)
    const tfList =result.map(item => { 
        const retVal = {...item}
        let dt = new Date(item.Date)
        let newdt = dt.toLocaleString('en-US', {timeZone: "UTC"})
        retVal.Date = newdt
        const _id = chance.guid();
        return { _id, ...retVal};
    });   
    res.status(200).json({
        message: "Get all fsn successful!",
        tfList: tfList
    });
    })
    . catch(error => {
        // log on console
        //console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
}

/* exports.getLimitAll = (req, res) => {
    const limit = req.body.pageSize
    const index = req.body.pageIndex
    const offset = index * limit 
    const query =  `SELECT id_finesse_serial_number AS fsnId, fsn_string AS Serial_Number, WO.wo_num AS Work_Order, LEFT(PCR.SpecName, 4) AS Product_Type, FSN.dtg AS Date, FSN.status AS Status, WO.id_wo_registry AS woId 
        FROM finesse_serial_number FSN, wo_registry WO, p_code_register PCR
        WHERE WO.id_wo_registry = FSN.id_wo_registry AND FSN.status <> "NEW" AND PCR.p_code = FSN.p_code AND LEFT(PCR.SpecName, 4) = "TFPT" ORDER BY Date DESC LIMIT ${offset}, ${limit}`
    
    const queryCount = `SELECT COUNT(*) FROM finesse_serial_number FSN, p_code_register PCR WHERE FSN.status <> "NEW" AND PCR.p_code = FSN.p_code AND LEFT(PCR.SpecName, 4) = "TFPT"`
    db.sequelize.query(query, {type: QueryTypes.SELECT})
    .then(result => {
        // console.log("result: ", result)
        const tfList =result.map(item => { 
            const retVal = {...item}
            let dt = new Date(item.Date)
            let newdt = dt.toLocaleString('en-US', {timeZone: "UTC"})
            retVal.Date = newdt
            const _id = chance.guid();
            return { _id, ...retVal};
        })
        // console.log("getLImitall: ", tfList)  
        db.sequelize.query(queryCount)
        .then(count => {
            // console.log("count: ", count[0][0]["COUNT(*)"])
            const totalRecord =  count[0][0]["COUNT(*)"]
            const pageCount = totalRecord / limit
            res.status(200).json({
                tfList: tfList,
                pages: pageCount
            })
        })
    })
} */

exports.getTFLbySN = (req, res) => {
    console.log("backend, getTFLbySN: ", req.body)
    const sn = req.body.data.sn
    const limit = req.body.data.pageSize
    const index = req.body.data.pageIndex
    const offset = index * limit 
    const query =  `SELECT id_finesse_serial_number AS fsnId, fsn_string AS Serial_Number, WO.wo_num AS Work_Order, LEFT(PCR.SpecName, 4) AS Product_Type, FSN.dtg AS Date, FSN.status AS Status, WO.id_wo_registry AS woId 
        FROM finesse_serial_number FSN, wo_registry WO, p_code_register PCR
        WHERE fsn_string = "` + sn + `" AND WO.id_wo_registry = FSN.id_wo_registry AND FSN.status <> "NEW" AND PCR.p_code = FSN.p_code AND LEFT(PCR.SpecName, 4) = "TFPT" ORDER BY Date DESC LIMIT ${offset}, ${limit}`
    
    const queryCount = `SELECT COUNT(*) FROM finesse_serial_number FSN, p_code_register PCR WHERE FSN.status <> "NEW" AND PCR.p_code = FSN.p_code AND LEFT(PCR.SpecName, 4) = "TFPT"`
    db.sequelize.query(query, {type: QueryTypes.SELECT})
    .then(result => {
        // console.log("result: ", result)
        const tfList =result.map(item => { 
            const retVal = {...item}
            let dt = new Date(item.Date)
            let newdt = dt.toLocaleString('en-US', {timeZone: "UTC"})
            retVal.Date = newdt
            const _id = chance.guid();
            return { _id, ...retVal};
        })
        // console.log("getLImitall: ", tfList)  
        db.sequelize.query(queryCount)
        .then(count => {
            // console.log("count: ", count[0][0]["COUNT(*)"])
            const totalRecord =  count[0][0]["COUNT(*)"]
            const pageCount = totalRecord / limit
            res.status(200).json({
                tfList: tfList,
                pages: pageCount
            })
        })
    })
}

exports.getLimitAll = (req, res) => {
    const limit = req.body.data.pageSize
    const index = req.body.data.pageIndex
    const offset = index * limit 
    /* const query =  `SELECT id_finesse_serial_number AS fsnId, fsn_string AS Serial_Number, WO.wo_num AS Work_Order, LEFT(PCR.SpecName, 4) AS Product_Type, FSN.dtg AS Date, FSN.status AS Status, WO.id_wo_registry AS woId 
        FROM finesse_serial_number FSN, wo_registry WO, p_code_register PCR
        WHERE WO.id_wo_registry = FSN.id_wo_registry AND FSN.status <> "NEW" AND PCR.p_code = FSN.p_code AND LEFT(PCR.SpecName, 4) = "TFPT" ORDER BY Date DESC LIMIT ${offset}, ${limit}`
    
    const queryCount = `SELECT COUNT(*) FROM finesse_serial_number FSN, p_code_register PCR WHERE FSN.status <> "NEW" AND PCR.p_code = FSN.p_code AND LEFT(PCR.SpecName, 4) = "TFPT"`
  */   
    const query =  `SELECT SQL_CALC_FOUND_ROWS *, id_finesse_serial_number AS fsnId, fsn_string AS Serial_Number, WO.wo_num AS Work_Order, LEFT(PCR.SpecName, 4) AS Product_Type, FSN.dtg AS Date, FSN.status AS Status, WO.id_wo_registry AS woId 
    FROM finesse_serial_number FSN, wo_registry WO, p_code_register PCR
    WHERE WO.id_wo_registry = FSN.id_wo_registry AND FSN.status <> "NEW" AND PCR.p_code = FSN.p_code AND LEFT(PCR.SpecName, 4) = "TFPT" ORDER BY Date DESC LIMIT ${offset}, ${limit}`
    
    const queryCount = `SELECT FOUND_ROWS()`

    db.sequelize.query(query, {type: QueryTypes.SELECT})
    .then(result => {
        // console.log("result: ", result)
        const tfList =result.map(item => { 
            const retVal = {...item}
            let dt = new Date(item.Date)
            let newdt = dt.toLocaleString('en-US', {timeZone: "UTC"})
            retVal.Date = newdt
            const _id = chance.guid();
            return { _id, ...retVal};
        })
        // console.log("getLImitall: ", tfList)  
        db.sequelize.query(queryCount, { type: QueryTypes.SELECT })
        .then(count => {
            // console.log("count: ", count[0][0]["COUNT(*)"])
            // const totalRecord =  count[0][0]["COUNT(*)"]
            const totalRecord =  count[0]["FOUND_ROWS()"]
            const pageCount = totalRecord / limit
            res.status(200).json({
                tfList: tfList,
                pages: pageCount
            })
        })
    })
}
exports.getMFCsById = (req, res) => {
    let id = req.params.id
    db.sequelize.query("CALL `[EWOI]MFCqueryByFSN`(:fsn)", { replacements: {fsn: id}, type: Sequelize.QueryTypes.SELECT })
    .then( result => {
        const data = result[0]
        // console.log("getMFCs: ", data)
        res.status(200).json( {
            data: data,
        })
    })
}


exports.updateTestEventRegistryById = (req, res) => {
    let id = req.params.id
    let comments = req.body.comments
    let userId = req.body.userId
    //console.log("comments: ", comments)
    //console.log(">>udatetest: id: ", id)
    //console.log(">>userId: ", userId)
    const currentDate = new Date().toLocaleString("en-US", { timeZone: 'America/Los_angeles'})
    //console.log(`currentdate is ${currentDate}`)
  /*   const now = new Date()
    const timenow = dateFormat(now, "yyyy-mm-dd hh:MM:ss")
    console.log("timenow: ", timenow)
 */
    const timenow = getNow()
    let qry = ""
    if (comments === undefined){
        qry = `UPDATE test_event_registry SET qa_dtg = "${timenow}"
        WHERE id_test_event_registry = ${id}
        `
    }else {
        qry = `UPDATE test_event_registry SET qa_dtg = "${timenow}", comments = "${comments}", id_user_qa = "${userId}"
                WHERE id_test_event_registry = ${id}
                `
    }
    db.sequelize.query(qry)
    .then( () => {
        //console.log("update successful!")
        const selQRY = `SELECT FSN.comments, FSN.qa_dtg, P.signature FROM test_event_registry FSN
        LEFT JOIN people P ON P.IDpeople = FSN.id_user_qa WHERE FSN.id_test_event_registry = ${id}
        `
        db.sequelize.query(selQRY).then(result => {
            const data = result[0][0]
            //console.log(">>test_event.. Return: ", data)
            res.status(200).json({
                data: { comments: data["comments"],
                        qa_dtg: data["qa_dtg"],
                        qa_sig: data["signature"]
                      }
            })
        })
    }).catch(error => {
        //console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        })
    })
}