const { response } = require('express');
const Sequelize = require('sequelize');
const { sequelize } = require('../config/db.config.js');
const db = require('../config/db.config.js');
const Customers = db.Customers;

exports.create = (req, res) => {
    let customer = {};

    try{
        // Building Customer object from upoading request's body
        customer.name = req.body.name;
        customer.address = req.body.address;
        customer.city = req.body.city;
        customer.state = req.body.state;
        customer.zipcode = req.body.zipcode;
        customer.phone_num = req.body.phone_num;
        customer.fax_num = req.body.fax_num;

        // Save to MySQL database
        Customers.create(customer).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Customer with id = " + result.name,
                customer: result,
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
  Customers.findAll()
      .then(data => {
          res.status(200).json({
              // message: "Get all Customers' Infos Successfully!",
              customers: data
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
