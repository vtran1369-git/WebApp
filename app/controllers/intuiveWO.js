
const {QueryTypes} = require('sequelize');
const { INT_sequelize } = require('../config/db.config.js');
const db = require('../config/db.config.js');
const { Chance } = require('chance');
const chance = new Chance();

exports.getLimitAll = (req, res) => {
  console.log("wo_registry.getLimitall: ", req.body)
  const limit = req.body.data.pageSize 
  const index = req.body.data.pageIndex 
  const offset = limit * index

  db.INT_sequelize.query(`SELECT * FROM dbo.JM_MFC_CDM_WorkOrders ORDER BY [Work Order ID] OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`, {type: QueryTypes.SELECT})
  .then(result =>{
    const woList = result.map(item =>{
      // console.log("item: ", item)
      const rowVal = {...item}
      const currentCust = item.EndCust
      // console.log("current CUST: ", currentCust)
      const newChangedCust = currentCust != null ? currentCust.split(':')[1] : null
      // console.log("newChangedCust: ", newChangedCust)
      rowVal.EndCust = newChangedCust
      const currentReqDate = item['Required Date']
      const newReqDate = new Date(currentReqDate).toLocaleDateString("en-US")
     /*  console.log("current reqDate: ", currentReqDate)
      console.log("new reqDate: ", newReqDate) */
      rowVal['Required Date'] = newReqDate
      const _id = chance.guid()
      return {_id, ...rowVal}
    })

    db.INT_sequelize.query(`SELECT COUNT(*) AS TotalCount FROM dbo.JM_MFC_CDM_WorkOrders`, {type: QueryTypes.SELECT})
    .then(count => {
      console.log("count: ", count)
      const totalRecord = count[0]["TotalCount"]
      const pageCount = Math.floor(totalRecord / limit)
      console.log("pagecount: ", pageCount)
      const remainder = totalRecord % limit
      console.log("remainder: ", remainder)
      res.status(200).json({
        woList: woList,
        pages: pageCount + (remainder > 0 ? 1 : 0)
      })
    })
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({
      message: error,
      error: error
    })
  })
}

exports.getbyWOID = (req, res) => {
  console.log("req.params: ", req.params )
  const woid = req.params.id
  console.log("woid: ", woid)
  /* db.INT_sequelize.query(`SELECT [Required Qty] AS Req_Qty,[Component Item Name] AS Item_Name,[Component Item ID] AS Item_ID, [Picklist Comment] AS Comment FROM JM_MFC_CDM_Picklist WHERE [Work Order ID] = ${woid}`)
  .then(result => {
    console.log("getBYwoid: ", result)
    res.status(200).json({
      wo: result
    })
  }) */
  // db.INT_sequelize.query(`SELECT CONCAT([Work Order ID],' : Required ',CAST([Required Date] AS DATE)) AS WO_RequiredDate, [Item ID], [Item Name], [Customer Name], [WO Reference], CONCAT('Quantity = ',[Start Qty]) AS START_QTY FROM Synoptix_WorkOrders WHERE [Work Order ID] = '${woid}'`)
  db.INT_sequelize.query(`SELECT [Work Order ID] AS WO, CAST([Required Date] AS DATE), [Item ID], [Item Name], [Customer Name], [WO Reference], CONCAT('Quantity = ',[Start Qty]) AS START_QTY FROM Synoptix_WorkOrders WHERE [Work Order ID] = '${woid}'`)
  .then(result => {
    const detailWO = result[0][0]
    console.log("getwoPicklist: ", detailWO)
    db.INT_sequelize.query(`SELECT [Required Qty] AS Req_Qty,[Component Item Name] AS Item_Name,[Component Item ID] AS Item_ID, [Picklist Comment] AS Comment FROM JM_MFC_CDM_Picklist WHERE [Work Order ID] = '${woid}'`)
    .then(component => {
      let pickList = component[0][0]
      console.log("pick list: ", pickList)
      if(pickList == null || undefined) { pickList = {"None" : "None"}}
      res.status(200).json({
        wo: detailWO,
        picklist: pickList
      })
    })
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({
      message: error,
      error: error
    })
  })
}
