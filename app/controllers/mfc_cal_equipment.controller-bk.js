const { response } = require('express');
const Sequelize = require('sequelize');
const { sequelize } = require('../config/db.config.js');
const { QueryTypes } = require('sequelize');
const db = require('../config/db.config.js');
const multer = require('multer')

exports.getAll= (req, res) => { 
     db.sequelize.query("SELECT * FROM MFCcalEquipView", { type: QueryTypes.SELECT })
    .then(result =>{
        console.log("query from MFCcalEquipView: ", result)
        let eqList = result.map( item => {
            let lastCal = new Date(item.LastCal).toLocaleDateString('en-US', {timeZone: "UTC"})
            let dueCal = new Date(item.CalDue).toLocaleDateString('en-US', {timeZone: "UTC"})
            // console.log("lastCal: ", lastCal, "dueCal: ", dueCal)
            let newRow = {...item}
            newRow.LastCal = lastCal
            newRow.CalDue = dueCal
            return newRow
        })
        res.status(200).json({
            equipList: eqList
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

exports.upDateCE = (req, res) => {
    let id = req.params.id;
    let obj = req.body.data

    console.log(">>>updateCE, IDCalEquip & data: ", id, ' ', obj)
    db.sequelize.query(`CALL updateCEstdCal(:CEIDin, :CertNumIn, :CalDateIn, :CalDueIn )`, {replacements: {
        CEIDin: obj.calEqID,
        CertNumIn: obj.newCertNum,
        CalDateIn: obj.lastCal,
        CalDueIn: new Date(obj.calDue) 
    }})
    .then (result => {
        console.log(">>>upDateCE response = ", result[0])
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
//http.put(`/mfccal/cert/equipment/upload`, formData)
//router.post('/api/mfccal/cert/equipment/upload', mfc_cal_equipment.upLoad)
exports.upLoad = (req, res) => {
    console.log("server got request from Upload!!")

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'public/tmp/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
    })

    const upload = multer({ storage: storage }).single('file')

    upload(req, res, function(err) {
        if(err instanceof multer.MulterError){
            return res.status(500).json(err)
        }else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
}