const { response } = require('express');
const Sequelize = require('sequelize');
const { sequelize } = require('../config/db.config.js');
const db = require('../config/db.config.js');
const Addresses = db.addresses;

exports.getAll = (req, res) => {
  // find all Customer information from 
  Addresses.findAll()
      .then(data => {
          res.status(200).json({
              // message: "Get all addresses' Infos Successfully!",
              addresses: data
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
