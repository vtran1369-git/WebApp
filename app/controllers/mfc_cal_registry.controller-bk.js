const { QueryTypes } = require('sequelize');
const db = require('../config/db.config.js');
const Mfc_cal = db.mfc_cal_registry;
const Chance = require("chance");
const { query } = require('express');

const chance = new Chance(); 

exports.create = (req, res) => {
    let mfc_cal = {};
    try{
        // Building Customer object from upoading request's body
        mfc_cal.wo = req.body.wo;
        mfc_cal.station = req.body.station;
        mfc_cal.molbloc = req.body.molbloc;
        mfc_cal.molbox = req.body.molbox;
        mfc_cal.refrange = req.body.refrange;
        mfc_cal.testgas = req.body.testgas;
        mfc_cal.procgas = req.body.procgas;
        mfc_cal.psi = req.body.psi;
        mfc_cal.flowrange = req.body.flowrange;
        mfc_cal.dutoutrange = req.body.dutoutrange;
        mfc_cal.duttolerance = req.body.duttolerance;
        mfc_cal.dutaddress = req.body.dutaddress;
        mfc_cal.kfactor = req.body.kfactor;
        mfc_cal.asfoundleft = req.body.asfoundleft;

        // Save to MySQL database
        Mfc_cal.create(mfc_cal).then(result => {    
            // send uploading message to client
            res.status(200).json({
                //message: "Upload Successfully with MFC SN = " + result.wo,
                mfc_cal: result
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

/* exports.getById = (req, res) => {
    let id = req.params.id;
    console.log("id: ", id);
    Mfc_cal.findByPk(id) ({
        attributes: [['WOnum'], ['stationName'],['testRefRange'], ['dutFlowRange'],['dutOutputRange'], ['dutTolerance'], ['procGas'], ['testGas'], 
        ['suppPress'], ['KFactor'], ['dutAddress'], ['asFoundLeft']],
        include: { model: people, attributes: [ Sequelize.fn("CONCAT", Sequelize.col('firstName),' ', Sequelize.col('lastName')), 'Operator'] },
        raw: true   
        })
        .then(data => {
            console.log(">>>result from getById: ", data);
            res.status(200).json({
                //message: " Successfully Get a wo_registry with id = " + id_wo_registry,
                mfc_cal_registry: data
            });
        })
        . catch(error => {
          // log on console
          console.log(error);
  
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
  }
   */

exports.getById = (req, res) => {
    let id = req.params.id;
    db.sequelize.query(`SELECT * FROM MFCcalDetail WHERE ID = ${id}`, { type: QueryTypes.SELECT })
    .then( result => {
        const data = result[0];
        console.log("wo : ", data["WO Number"])
        const rtnObj = {
            wo: data['WO Number'],
            station: data.Station,
            molbloc: data.Molbloc,
            molbox: data.Molbox,
            refrange: data['Ref Range'],
            testgas: data['Test Gas'],
            procgas: data['Process Gas'],
            psi: data['Supply Pressure (PSI)'],
            flowrange: data['DUT Flow Range'],
            dutoutrange: data['DUT Output Range'],
            duttolerance: data['DUT Tolerance'],
            dutaddress: data['DUT Address'],
            kfactor: data['K Factor'],
            asfoundleft: data['As Left Found'],
            operator: data['Operator'],
            calDTG: data['Cal DTG']
            }
        res.status(200).json({
            mfc_cal: rtnObj
        })
    })
    . catch(error => {
        // log on console
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}

exports.getAll= (req, res) => { 
// db.sequelize.query("SELECT * FROM CDMmasterList LIMIT 300", { type: QueryTypes.SELECT })
const recordCount = req.params.recordCount
console.log("recordCount: ", recordCount)

db.sequelize.query(`SELECT * FROM CDMmasterList LIMIT ${recordCount}`, { type: QueryTypes.SELECT })
.then(cdmlist =>{
    const cdmlist_rtn = cdmlist.map(item =>{
        const retVal = {...item};
        let dt = new Date(item.CalDTG);
        //console.log(">>date: ", dt)
        let newdt = dt.toLocaleString('en-US', {timeZone: "UTC"});
        retVal.CalDTG = newdt;
        const _id = chance.guid();
        
        return { _id, ...retVal };
    });
    console.log("getall: ", cdmlist_rtn)
    res.status(200).json({
        cdmList: cdmlist_rtn
    });
})

.catch(error => {
    // log on console
    console.log(error);
    res.status(500).json({
        message: "Error!",
        error: error
    });
});
}

exports.getLimitAll= (req, res) => { 
    try{
        // db.sequelize.query("SELECT * FROM CDMmasterList LIMIT 300", { type: QueryTypes.SELECT })
        //console.log("body: ", req.body)
        
        const limit = req.body.pageSize
        const index = req.body.pageIndex
        const offset = index * limit 
        const queryCount = `SELECT COUNT(*) FROM CDMmasterList`
        const queryCDMLimit = `SELECT * FROM CDMmasterList LIMIT ${offset}, ${limit}`
        const option = `{ type: QueryTypes.SELECT }`
        db.sequelize.query(`SELECT * FROM CDMmasterList LIMIT ${offset}, ${limit}`, { type: QueryTypes.SELECT })
        
        // db.sequelize.query(queryCDMLimit, option)
        .then(cdmlist =>{
            const cdmlist_rtn = cdmlist.map(item =>{
                const retVal = {...item};
                let dt = new Date(item.CalDTG);
                //console.log(">>date: ", dt)
                let newdt = dt.toLocaleString('en-US', {timeZone: "UTC"});
                retVal.CalDTG = newdt;
                const _id = chance.guid();
                return { _id, ...retVal };
            })
            //console.log("getlimitall: ", cdmlist_rtn)
            
           /*  res.status(200).json({
                cdmList: cdmlist_rtn,
                pages: pageCount
            }) */
            db.sequelize.query(queryCount)
            .then(count => {
                //console.log("count: ", count[0][0]["COUNT(*)"])
                const totalRecord =  count[0][0]["COUNT(*)"]
                const pageCount = totalRecord / limit
                res.status(200).json({
                    cdmList: cdmlist_rtn,
                    pages: pageCount
                })
            })
        })
    }catch(err){
        res.status(500).json({
            message: "Error ",
            error: error.message
        });
    }
}

    
exports.updateById = async (req, res) => {
    try{
        let id = req.params.id;
        //console.log(">>updatebyID: ", id)
        let mfc_cal = await Mfc_cal.findByPk(id);
        //console.log(">>>body posting: ", req.body)

        if(!mfc_cal){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a wo_registry with id = " + id,
                mfc_cal: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                WOnum: req.body.wo,
                testGas: req.body.testgas,
                suppPress: req.body.psi,
                KFactor: req.body.kfactor,
                dutAddress: req.body.dutaddress,
                asFoundLeft: req.body.asfoundleft
            }
            //console.log(">>UPDATE Ojb: ", updatedObject)
            let result = await Mfc_cal.update(updatedObject, {returning: true, where: {IDmfcCal: id}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a wo_registry with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Updated successfully!",
                mfc_cal: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a wo_registry with id = " + req.params.id,
            error: error.message
        });
    }
}
// get certification information
exports.getCertById = (req, res) => {
    let id = req.params.id;
    //console.log(">>>getID: ", id)
    db.sequelize.query(`CALL mfcCalDocsA(:IDmfcCal)`, {replacements: {IDmfcCal: id}})
    .then (result => {
        //console.log(">>>call getCertById, certNo = ", result[0].CertNum)
        res.status(200).json({
            data: result[0]
        })    
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Error!",
            error: err
        })
    })
   
}
 // query to get raw data of calibration test report
 exports.getCalRptById = (req, res) => {
    let id = req.params.id;
    //console.log(">>>getID: ", id)
    db.sequelize.query(`CALL mfcCalDocRpt(:IDmfcCal)`, {replacements: {IDmfcCal: id}})
    .then (result => {
        //console.log(">>>call getCalRptById, result = ", result)
        res.status(200).json({
            data: result
        })    
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Error!",
            error: err
        })
    })
   
}


//Insert into DB "pegasus.certification" and Update "mfc_cal_registry" when Technician sign off Cert.form
exports.createNewCertNUpdateCalReg = (req, res) => {
    let id = req.params.id;
    //console.log(">>>CalID: ", id)
    //console.log("body req: ", req.body)
    let comments = req.body.data
    
    db.sequelize.query(`CALL MFCtechSignCert(:IDmfcCal)`, {replacements: {IDmfcCal: id}})
    .then (result => {
        res.status(200).json({
            data: result
        })
        //console.log("GET result from Call 'MFCtechSignCert'", result) 
        let newCertNum = result[0].newCertNum
        //console.log("comments & newCertNum: ", comments, ", ", newCertNum)
        if (comments) {
           db.sequelize.query(`UPDATE certification SET remarks = "${comments}" WHERE cert_number = ${newCertNum} AND ID_cert_type=8`)
        .then(() => console.log("Update certification successful!"))
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Error!",
            error: err
        })
    })
  /*   console.log("comments & newCertNum: ", comments, ", ", newCertNum)
    if (comments && newCertNum) {
        console.log(`UPDATE "pegasus.certification" SET remarks = ${comments} WHERE cert_number = ${newCertNum}`)
        db.sequelize.query(`UPDATE "pegasus.certification" SET remarks = ${comments} WHERE cert_number = ${newCertNum}`)
        .then(() =>{
            console.log("Update Certification at Remark successful!")
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                message: "Failed on Update Certification at Remark!",
                error: err
            })
        })
    } */
    
}