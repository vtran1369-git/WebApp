const { response } = require('express');
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const db = require('../config/db.config.js');
const AGITATOR = db.AGIT_ETRAV;

exports.create = (req, res) => {
    let agitator = {};
    console.log("Client send body to server: ")
    console.log(req.body)
    try{
        // Building agitator object from upoading request's body
        agitator.wo_num = req.body.wo_num;
        agitator.tech_name = req.body.tech_name;
        agitator.tech_date = req.body.tech_date;
        agitator.model_num = req.body.model_num;
        agitator.model_rev = req.body.model_rev
        agitator.serial_num = req.body.serial_num;
        agitator.po_num = req.body.po_num;
        agitator.customer = req.body.customer;
        agitator.motor_name = req.body.motor_name;
        agitator.motor_sn = req.body.motor_sn;
        agitator.motor_turn_cw_ccw = req.body.motor_turn_cw_ccw;
        agitator.run_entire_range = req.body.run_entire_range;
        agitator.prod_sn_labels_attached = req.body.prod_sn_labels_attached;
        agitator.supplier_name = req.body.supplier_name;
        agitator.opID = req.body.opID
        agitator.opDate = req.body.opDate
        agitator.qaID= req.body.qaID
        agitator.qaDate = req.body.qaDate
        agitator.finalQAID= req.body.finalQAID
        agitator.finalQADate= req.body.finalQADate
        agitator.editorID = req.body.editorID
        agitator.editorDate = req.body.editorDate
        agitator.comments = req.body.comments
        agitator.status = req.body.status
        agitator.signed = req.body.signed
        // Save to MySQL database
      /*   let dt = new Date(agitator.tech_date)
        let newdt = dt.toLocaleString('en-US', {timeZone: "UTC", hour12: false}); */
        console.log("qaDATE: " + agitator.qaDate)
        console.log(agitator)
        AGITATOR.create(
            agitator
            ).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Submit successful: " + result,
                agitator: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}


exports.getAll = (req, res) => {
  // find all agitator information from 
  const limit = req.body.data.pageSize
  const index = req.body.data.pageIndex
  const offset = limit * index
  console.log("limit & index: " + limit + ' ' + index)
 /*  AGITATOR.findAll({
    attributes: [['idagitator_etraveler', 'id'], ['wo_num', 'wo_num'], ['serial_num', 'serial_num'], ['model_num','model_num'], ['po_num', 'po_num'],['tech_name','tech_name']  ,['tech_date','tech_date'] ],
    // raw: true,
    limit: limit,
    offset: limit * index,
  }) */
//   db.sequelize.query(`SELECT idagitator_etraveler AS id, wo_num, serial_num, model_num, po_num, tech_name, tech_date FROM agitator_etraveler LIMIT ${offset}, ${limit}`, {type: QueryTypes.SELECT})
db.sequelize.query(`SELECT * FROM agitator_etraveler LIMIT ${offset}, ${limit}`, {type: QueryTypes.SELECT})
.then(data => {
        console.log("getall: " + data[0])
        db.sequelize.query(`SELECT COUNT(*) FROM agitator_etraveler`, { type: QueryTypes.SELECT })
        .then(count => {
            console.log("count: ", count)
            const totalRecord =  count[0]["COUNT(*)"]
            // console.log("count: ", count)
            // const totalRecord =  count[0]["FOUND_ROWS()"]
            const pageCount = totalRecord / limit
            res.status(200).json({
                agitators: data,
                pages: Math.ceil(pageCount)
            })
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

exports.getById = (req, res) => {
    let id = req.params.id;
    db.sequelize.query(`SELECT * FROM agitator_etraveler WHERE ID = ${id}`, { type: QueryTypes.SELECT })
    .then( result => {
        const data = result[0];
        console.log("wo : ", data["wo_num"])
        const rtnObj = {
            wo_num: data['wo_num'],
            serial_num: data['serial_num'],
            model_num: data['model_num'],
            po_num: data['po_num'],
            tech_name: data['tech_name'],
            tech_date: data['tech_date']
            }
        res.status(200).json({
            agitator: rtnObj
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

//NEED TO DO replacing mfccal by Agitator
exports.updateById = async (req, res) => {
    try{
        let id = req.params.id;
        console.log(">>updatebyID: ", id)
        let agitator = await AGITATOR.findByPk(id);
        console.log(">>>SERVER retrieved from updateByID-BODY: ")
        console.log(req.body)
        let newAgitatorData = req.body

        if(!agitator){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating an Agitator traveler with id = " + id,
                agitator: "",
                error: "404"
            });
        } else {    
            console.log("FOUND agitator by id")
            let result = await AGITATOR.update(newAgitatorData, {returning: true, where: {idagitator_etraveler: id}});
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update Agitator with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Updated successfully!",
                agitator: newAgitatorData,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a wo_registry with id = " + req.params.id,
            error: error.message
        });
    }
}

