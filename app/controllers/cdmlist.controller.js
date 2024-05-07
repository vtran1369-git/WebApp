
const { QueryTypes } = require('sequelize');
const db  = require('../config/db.config.js');

/* exports.getAll = async() =>{
    const cdmList = await db.sequelize.query("SELECT * FROM cdmlist LIMIT 10", { type: QueryTypes.SELECT });
    console.log(">>> ", cdmList)
}
 */
/**  WOnum AS Work Order, CalDTG AS Cal_Date, Customer, 'Customer Location', DUT, GasRange */

exports.getAll= (req, res) => { 
    // db.sequelize.query("SELECT * FROM cdmlist LIMIT 10", { type: QueryTypes.SELECT })
    // db.sequelize.query("SELECT * FROM cdmlist", { type: QueryTypes.SELECT })
    console.log("running in getAll-cdmList");
    db.sequelize.query("SELECT * FROM CDMList", { type: QueryTypes.SELECT })
    .then(cdmlist =>{
        const cdmlist_rtn = cdmlist.map(item =>{
            const retVal = {...item};
            /* let dt = new Date(item.CalDTG);
            let newdt = dt.toLocaleString('en-US');
            retVal.CalDTG = newdt; */
            return retVal;
            });
           res.status(200).json({ cdm: cdmlist_rtn });
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