const { response } = require('express');
const Sequelize = require('sequelize');
const { sequelize } = require('../config/db.config.js');
const db = require('../config/db.config.js');
const mfc_registry = require('../models/mfc_registry.js');
const Mfc_registry = db.mfc_registry;

exports.create = (req, res) => {
    let mfc = {};

    try{
        // Building Customer object from upoading request's body
        mfc.sn = req.body.sn;
        mfc.model = req.body.model;
        mfc.devId = req.body.devId;
        mfc.mfrName = req.body.mfrName;
        mfc.addedDt = req.body.addedDt;
        mfc.status = req.body.status;
        // Save to MySQL database
        
        Mfc_registry.create(mfc).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully with MFC SN = " + result.sn,
                mfc_registry: result
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
  // find all Customer information from 
  Mfc_registry.findAll()
      .then(data => {
          res.status(200).json({
              // message: "Get all mfc_registry' Infos Successfully!",
              mfc_registry: data
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
