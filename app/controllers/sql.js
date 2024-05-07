const CDM = 
    `SELECT CAL.IDmfcCal AS CalID, MFC.IDmfc AS MFCID, CAL.WOnum AS WOnum,
    CAL.calDTG AS CalDTG,
    control.fullNameByID(CAL.IDpeople) AS Operator,
    CUST.name AS Customer,
    CONCAT(CUST.address,
            ' ',
            CUST.city,
            ' ',
            CUST.state,
            ' ',
            CUST.country) AS "Customer Location",
    CONCAT(ADDR.name,
            ' ',
            MFC.model,
            ' SN=',
            MFC.sn) AS DUT,
    CONCAT(CAL.procGas,
            ', ',
            CAL.dutFlowRange) AS GasRange
    FROM
    ((((mfc_cal_registry CAL
    LEFT JOIN mfc_registry MFC ON ((MFC.IDmfc = CAL.IDmfcRegistry)))
    LEFT JOIN IntuitiveCustomer CUST ON ((CUST.custGUIDbin = CAL.custGUID)))
    LEFT JOIN addresses ADDR ON ((ADDR.id_addresses = MFC.IDmfr)))
    LEFT JOIN certification CERT ON ((CERT.id_certification = MFC.IDcertMaterial)))
    WHERE
    (CAL.calDTG > (NOW() + INTERVAL -(12) MONTH))
    ORDER BY CAL.calDTG DESC`;

const str1 = "SELECT SQL_CALC_FOUND_ROWS CAL.IDmfcCal AS CalID, MFC.IDmfc AS MFCID, CAL.WOnum AS WOnum, CAL.calDTG AS CalDTG, ";
const str2 = "control.fullNameByID(CAL.IDpeople) AS Operator, CUST.name AS Customer, ";
const str3 = `CONCAT(CUST.address,' ',CUST.city,' ',CUST.state,' ',CUST.country) AS "Customer Location", `
const str4 = `CONCAT(ADDR.name,' ',MFC.model,' SN=',MFC.sn) AS DUT,CONCAT(CAL.procGas,', ',CAL.dutFlowRange) AS GasRange `
const str5 = `FROM ((((mfc_cal_registry CAL LEFT JOIN mfc_registry MFC ON ((MFC.IDmfc = CAL.IDmfcRegistry)))
LEFT JOIN IntuitiveCustomer CUST ON ((CUST.custGUIDbin = CAL.custGUID))) `
const str6 = `LEFT JOIN addresses ADDR ON ((ADDR.id_addresses = MFC.IDmfr)))
LEFT JOIN certification CERT ON ((CERT.id_certification = MFC.IDcertMaterial))) 
WHERE (CAL.calDTG > (NOW() + INTERVAL -(6) MONTH))
ORDER BY CAL.calDTG DESC`
const CDM_QRY = str1.concat(str2, str3, str4, str5, str6)
// console.log("CDM_QRY: ", CDM_QRY)

module.exports = { CDM, CDM_QRY }
