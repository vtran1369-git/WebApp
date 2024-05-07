const { response } = require('express');
const Sequelize = require('sequelize');
const { sequelize } = require('../config/db.config.js');
const { QueryTypes } = require('sequelize');
const db = require('../config/db.config.js');
const multer = require('multer')
const CertDB = db.Certification

exports.getAll= (req, res) => { 
    //  db.sequelize.query("SELECT * FROM MFCcalEquipView", { type: QueryTypes.SELECT })
    db.sequelize.query("SELECT * FROM MFCcalEquipList", { type: QueryTypes.SELECT })
    .then(result =>{
        //console.log("query from MFCcalEquipView: ", result)
        let eqList = result.map( item => {
            let lastCal = new Date(item.LastCal).toLocaleDateString('en-US', {timeZone: "UTC"})
            let dueCal = new Date(item.CalDue).toLocaleDateString('en-US', {timeZone: "UTC"})
            /* console.log("idcalequipt: ", item.IDcalEquip)
            console.log("raw date-last: ", item.LastCal, "raw due: ", item.CalDue)
            console.log("lastCal: ", lastCal, "dueCal: ", dueCal) */
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

    //console.log(">>>updateCE, IDCalEquip & data: ", id, ' ', obj)
    db.sequelize.query(`CALL updateCEstdCal(:CEIDin, :CertNumIn, :CalDateIn, :CalDueIn )`, {replacements: {
        CEIDin: obj.calEqID,
        CertNumIn: obj.newCertNum,
        CalDateIn: obj.lastCal,
        CalDueIn: new Date(obj.calDue) 
    }})
    .then (result => {
        //console.log(">>>upDateCE response = ", result[0])
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
    //console.log("server got request from Upload!!")
    //console.log("formdata: ", req.body)
    //below use to save file to local storage:
   /*  const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'public/tmp/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' +file.originalname )
        }
    }) */
    //file will be save in memory temporary
    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage }).single('file')
  
    upload(req, res, function(err) {
        const certData = req.body
        //console.log("calEqID:" , certData.CEIDin);
        //console.log("certnum: ", certData.CertNumIn)
        //console.log("CalDateIn: ", certData.CalDateIn)
        //console.log("CalDueIn: ", new Date(certData.CalDueIn))
        const fileStream = req.file.buffer
        //console.log("file: ", req.file)
        //console.log("buffer: ", fileStream)

        db.sequelize.query(`CALL updateCEstdCal(:CEIDin, :CertNumIn, :CalDateIn, :CalDueIn )`, {replacements: {
            CEIDin: certData.CEIDin,
            CertNumIn: certData.CertNumIn,
            CalDateIn: new Date(certData.CalDateIn),
            CalDueIn: new Date(certData.CalDueIn) 
        }})
        .then (result => {
            //console.log(">>>upDateCE response = ", result[0])
            //console.log("upload file: ", req.file)
            
            //need to Update "certification db" by cert_pdf = pdf file where cERTID = new certID
            const newCertID = result[0]["CertNewID"]
            //console.log("newcerID: ", result[0]["CertNewID"])
            
            CertDB.update(
                { cert_pdf: fileStream},
                {where: { id_certification: newCertID } }
            )
            
            // db.sequelize.query(`UPDATE certification SET cert_pdf = ${fileStream} WHERE id_certification = ${newCertID}`)
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

        /* if(err instanceof multer.MulterError){
            return res.status(500).json(err)
        }else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file) */
    })
}

exports.download = (req, res) => {
    const id = req.params.id
    //console.log("download cerId: ", id)
    // CertDB.findByPk(req.params.id)
    db.sequelize.query(`SELECT cert_pdf FROM pegasus.certification WHERE id_certification = ${id}`)
    .then(file => {
        res.contentType("application/pdf")
        res.send(file[0][0].cert_pdf)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Error!",
            error: err
        })
    })

}