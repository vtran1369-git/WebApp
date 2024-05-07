CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `sprocHandler`@`localhost` 
    SQL SECURITY DEFINER
VIEW `MFCcalDetail` AS
    SELECT 
        `CR`.`IDmfcCal` AS `ID`,
        `CR`.`compassUsrName` AS `Operator`,
        `CR`.`stationName` AS `Station`,
        `CR`.`calDTG` AS `Cal DTG`,
        `CR`.`WOnum` AS `WO Number`,
        CONCAT(`CE`.`Model`, ' : ', `CE`.`SN`) AS `Molbloc`,
        CONCAT(`CE2`.`Model`, ' : ', `CE2`.`SN`) AS `Molbox`,
        `CR`.`testRefRange` AS `Ref Range`,
        `CR`.`testGas` AS `Test Gas`,
        `CR`.`procGas` AS `Process Gas`,
        `CR`.`suppPress` AS `Supply Pressure (PSI)`,
        `CR`.`dutFlowRange` AS `DUT Flow Range`,
        `CR`.`dutOutputRange` AS `DUT Output Range`,
        `CR`.`dutTolerance` AS `DUT Tolerance`,
        `CR`.`dutAddress` AS `DUT Address`,
        `CR`.`KFactor` AS `K Factor`,
        `CR`.`asFoundLeft` AS `As Left Found`
    FROM
        ((`mfc_cal_registry` `CR`
        LEFT JOIN `cal_equipment` `CE` ON ((`CE`.`IDcalEquip` = `CR`.`IDtestBloc`)))
        LEFT JOIN `cal_equipment` `CE2` ON ((`CE2`.`IDcalEquip` = `CR`.`IDtestRef`)))