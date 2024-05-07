
const {Sequelize, QueryTypes} = require('sequelize');
const { sequelize } = require('../config/db.config.js');
const db = require('../config/db.config.js');
const WO_Registry = db.WO;
const Users = db.Users;
const Chance = require('chance')
const chance = new Chance(); 

exports.getwo_nums = (req, res) => {
  WO_Registry.findAll({
    attributes: ["wo_num"],
    raw: true
  }).
  then(result => {
    console.log("wo numbers: ", result)
    let woList = []
    result.map(wo_num => woList.push(wo_num["wo_num"]) )
    console.log("woNumList: ", woList)
    res.status(200).json({
      data: woList
    })
  })
}

exports.retrieveAll = (req, res) => {
  WO_Registry.findAll({ 
    attributes: [['wo_num','WO Number'], ['dtg','Created Date'],['qty', 'Quantity'], ['date_req','Required Date'], ['status','Status'],['instructions','Instruction']],
    include: { model: Users, attributes: [[ Sequelize.fn("CONCAT",Sequelize.col('first_name'),' ', Sequelize.col('last_name')), 'fullname']]},
    raw: true
  })
  .then(result => {
    console.log("response from wo_registry_controller.retrieveAll() ")
    // console.log("result: ", result)
    const wo =result.map(item => { 
      const _id = chance.guid();
      return { _id, ...item};
    });
    const newData = wo.map(({'user_registry.fullname': Full_Name, ...rest}) => ({ Full_Name, ...rest}));
    let objArray = []
    let length = newData.length
    for(let i = 0; i < length; i++){
      let newObj = {}
      newObj["_id"] = newData[i]["_id"]
      newObj["WO Number"] = newData[i]["WO Number"]
      newObj["Quantity"] = newData[i]["Quantity"]
      let createdDate = newData[i]["Created Date"]
      newObj["Created Date"] = new Date(createdDate).toLocaleString('en-US',{timeZone: "UTC"})
      newObj["Full_Name"] = newData[i]["Full_Name"]
      let reqDate = newData[i]["Required Date"]
      newObj["Required Date"] =new Date(reqDate).toLocaleDateString('en-US', {timeZone: "UTC"})
      newObj["Instruction"] = newData[i]["Instruction"]
      newObj["Status"] = newData[i]["Status"]
      objArray.push(newObj)
    }
    res.status(200).json({
        // message: "Get all wo_registrys' Infos Successfully!",
        work_orders: objArray
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

exports.getLimitAll = (req, res) => {
  console.log("wo_registry.getLimitall: ", req.body)
  const limit = req.body.data.pageSize 
  const index = req.body.data.pageIndex 
  const offset = limit * index

  WO_Registry.findAndCountAll({ 
    attributes: [['wo_num','WO Number'], ['dtg','Created Date'],['qty', 'Quantity'], ['date_req','Required Date'], ['status','Status'],['instructions','Instruction']],
    include: { model: Users, attributes: [[ Sequelize.fn("CONCAT",Sequelize.col('first_name'),' ', Sequelize.col('last_name')), 'fullname']]},
    raw: true,
    limit: limit,
    offset: offset
  })
  .then(result => {
   
    console.log("findAndCountAll>>result: ", result)
    const wo =result.rows.map(item => { 
      const _id = chance.guid();
      return { _id, ...item};
    });
    const newData = wo.map(({'user_registry.fullname': Full_Name, ...rest}) => ({ Full_Name, ...rest}));
    let objArray = []
    let length = newData.length
    for(let i = 0; i < length; i++){
      let newObj = {}
      newObj["_id"] = newData[i]["_id"]
      newObj["WO Number"] = newData[i]["WO Number"]
      newObj["Quantity"] = newData[i]["Quantity"]
      let createdDate = newData[i]["Created Date"]
      newObj["Created Date"] = new Date(createdDate).toLocaleString('en-US',{timeZone: "UTC"})
      newObj["Full_Name"] = newData[i]["Full_Name"]
      let reqDate = newData[i]["Required Date"]
      newObj["Required Date"] =new Date(reqDate).toLocaleDateString('en-US', {timeZone: "UTC"})
      newObj["Instruction"] = newData[i]["Instruction"]
      newObj["Status"] = newData[i]["Status"]
      objArray.push(newObj)
    }
    res.status(200).json({
        work_orders: objArray,
        pages: result.count 

    });
  })
  . catch(error => {
    // log on console
    console.log(error);
    res.status(500).json({
        message: "Error!",
        error: error.message
    });
  });
}

exports.getWOById = (req, res) => {
  // find all wo_registry information from 
  let id_wo_registry = req.params.id;
  console.log("id: ", id_wo_registry);
  WO_Registry.findByPk(id_wo_registry)
      .then(wo => {
          res.status(200).json({
              //message: " Successfully Get a wo_registry with id = " + id_wo_registry,
              //wo_registrys: wo
              work_order: wo
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
//added 10/24/2023
exports.getWOBySN = (req, res) => {
  let sn = req.params.sn;
  db.sequelize.query(`SELECT FSN.fsn_string, wo_num, agilePartNum FROM finesse_serial_number FSN,
  wo_registry WO WHERE FSN.id_wo_registry = WO.id_wo_registry AND fsn_string = "${sn}"`, { type: QueryTypes.SELECT })
    .then(result =>{
      res.status(200).json({
        data: result
      })
    })
    . catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error!",
        error: error
      });
    });
   /*  WO_Registry.findAll({
                      attributes: ['id_wo_registry', 'wo_num', 'qty'],
                      where: {wo_num: wo_num}
                    })
          .then(results => {
            res.status(200).json({
                message: "Get all Work Orders with WO_NUM = " + wo_num,
                WO_Registry: results,
            });
          })
          . catch(error => {
              console.log(error);
              res.status(500).json({
                message: "Error!",
                error: error
              });
            }); */
}
 


exports.filteringByWO = (req, res) => {
  let wo_num = req.query.wo_num;

    WO_Registry.findAll({
                      attributes: ['id_wo_registry', 'dtg', 'wo_num', 'qty', 'date_req', 'status', 'id_user_registry', 'instructions', 'agilePartNum'],
                      where: {wo_num: wo_num}
                    })
          .then(results => {
            res.status(200).json({
                message: "Get all Work Orders with WO_NUM = " + wo_num,
                WO_Registry: results,
            });
          })
          . catch(error => {
              console.log(error);
              res.status(500).json({
                message: "Error!",
                error: error
              });
            });
}
 
exports.pagination = (req, res) => {
  try{
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
  
    const offset = page ? page * limit : 0;
  
    WO_Registry.findAndCountAll({ limit: limit, offset:offset })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
          data: {
              "copyrightby": "VIEN TRAN",
              "totalItems": data.count,
              "totalPages": totalPages,
              "limit": limit,
              "currentPageNumber": page + 1,
              "currentPageSize": data.rows.length,
              "workOrder": data.rows
          }
        };
        res.send(response);
      });  
  }catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }    
}

exports.pagingfilteringsorting = (req, res) => {
  try{
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let wo_num = parseInt(req.query.wo_num);
  
    const offset = page ? page * limit : 0;

    console.log("offset = " + offset);
  
    wo_registry.findAndCountAll({
                                attributes: ['id_wo_registry', 'dtg', 'wo_num', 'qty', 'date_req', 'status', 'id_user_registry', 'instructions', 'agilePartNum'],
                                where: {wo_num: wo_num}, 
                                order: [
                                  ['date_req', 'DESC']
                                ],
                                limit: limit, 
                                offset:offset 
                              })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", age = " + age,
          data: {
              "copyrightby": "Vien Tran",
              "totalItems": data.count,
              "totalPages": totalPages,
              "limit": limit,
              "wo_num-filtering": wo_num,
              "currentPageNumber": page + 1,
              "currentPageSize": data.rows.length,
              "workOrders": data.rows
          }
        };
        res.send(response);
      });  
  }catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }      
}

exports.updateById = async (req, res) => {
    try{
        let id_wo_registry = req.params.id;
        let wo_registry = await WO_Registry.findByPk(id_wo_registry);
    
        if(!wo_registry){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a wo_registry with id = " + id_wo_registry,
                wo_registry: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                wo_num: req.body.wo_num,
                dtg: req.body.dtg,
                qty: req.body.qty,
                date_req: req.body.date_req,
                status: req.body.status,
                instructions: req.body.instructions,
                agilePartNum: req.body.agilePartNum
            }
            let result = await WO_Registry.update(updatedObject, {returning: true, where: {id: id_wo_registry}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a wo_registry with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a wo_registry with id = " + id_wo_registry,
                wo_registry: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a wo_registry with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let id_wo_registry = req.params.id;
        let wo_registry = await wo_registry.findByPk(id_wo_registry);

        if(!wo_registry){
            res.status(404).json({
                message: "Does Not exist a wo_registry with id = " + id_wo_registry,
                error: "404",
            });
        } else {
            await wo_registry.destroy();
            res.status(200).json({
                message: "Delete Successfully a wo_registry with id = " + id_wo_registry,
                wo_registry: wo_registry,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a wo_registry with id = " + req.params.id,
            error: error.message,
        });
    }
}