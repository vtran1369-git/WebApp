CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `sprocHandler`@`localhost` 
    SQL SECURITY DEFINER
VIEW `CDMmasterList` AS
    SELECT 
        `CAL`.`IDmfcCal` AS `CalID`,
        `MFC`.`IDmfc` AS `MFCID`,
        `CAL`.`WOnum` AS `WOnum`,
        `CAL`.`calDTG` AS `CalDTG`,
        `control`.`fullNameByID`(`CAL`.`IDpeople`) AS `Operator`,
        `CUST`.`name` AS `Customer`,
        CONCAT(`CUST`.`address`,
                ' ',
                `CUST`.`city`,
                ' ',
                `CUST`.`state`,
                ' ',
                `CUST`.`country`) AS `Customer Location`,
        CONCAT(`ADDR`.`name`,
                ' ',
                `MFC`.`model`,
                ' SN=',
                `MFC`.`sn`) AS `DUT`,
        CONCAT(`CAL`.`procGas`,
                ', ',
                `CAL`.`dutFlowRange`) AS `GasRange`,
        `MFC`.`dtgAdded` AS `Added`,
        `MFC`.`lastCalDate` AS `LastCal`,
        `MFC`.`calDueDate` AS `CalDue`,
        `ADDR`.`name` AS `Mfr`,
        `MFC`.`model` AS `model`,
        `MFC`.`sn` AS `SN`,
        `MFC`.`mfrDevID` AS `MfrDevID`,
        `MFC`.`status` AS `Status`,
        `CERT`.`device_serial` AS `MatBatch`,
        `MFC`.`comment` AS `Comments`
    FROM
        ((((`pegasus`.`mfc_cal_registry` `CAL`
        LEFT JOIN `pegasus`.`mfc_registry` `MFC` ON ((`MFC`.`IDmfc` = `CAL`.`IDmfcRegistry`)))
        LEFT JOIN `pegasus`.`IntuitiveCustomer` `CUST` ON ((`CUST`.`custGUIDbin` = `CAL`.`custGUID`)))
        LEFT JOIN `pegasus`.`addresses` `ADDR` ON ((`ADDR`.`id_addresses` = `MFC`.`IDmfr`)))
        LEFT JOIN `pegasus`.`certification` `CERT` ON ((`CERT`.`id_certification` = `MFC`.`IDcertMaterial`)))
    WHERE
        (`CAL`.`calDTG` > (NOW() + INTERVAL -(6) MONTH))
    ORDER BY `CAL`.`calDTG` DESC