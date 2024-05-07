const { QueryTypes } = require('sequelize');
const db = require('../config/db.config.js');
const Op = db.Sequelize.Op
const People = db.people;

exports.getById = (req, res) => {
    let id = req.params.id;
    db.sequelize.query(`SELECT * FROM people WHERE IDpeople = ${id}`, { type: QueryTypes.SELECT })
    .then( data => {
            console.log("people data from sql: ", data)
            res.status(200).json({
            data: data
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

exports.getManyByIds = (req, res)  => {
    let ids = req.body.data
    console.log("backend-getManybyIds-ids: ", ids)
   /*  People.findAll({
        WHERE: {IDpeople: ids}
        // WHERE: {IDpeople: {[Op.in]: ids}}
    }) */
    let str = ''
    const arrayStr = ids.map( item =>{
        str = str + item + ','
        }
    )

    console.log("Str: ", str)
    console.log("str.length: ", str.length)
    let inRange = str.substring(0,str.length -1)
    console.log("in range: ", inRange + ')')
    let peopleInfo = {}
    db.sequelize.query(`SELECT * FROM people WHERE IDpeople IN (${inRange}) ORDER BY FIND_IN_SET(IDPeople, '${inRange}')`)
    .then(result => {
        console.log("result from getManybyIds: ", result[0])
        let dataRows = result[0];
        dataRows.map( item => {
            peopleInfo[item.IDpeople] = item.signature;
            console.log("peopleInfo: ", peopleInfo)
        })
    })
    .catch( error => console.log(error))
    console.log("peopleInfo: ", peopleInfo)
}


