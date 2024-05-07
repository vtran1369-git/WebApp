CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `sprocHandler`@`localhost` 
    SQL SECURITY DEFINER
VIEW `MFCcalEquipList` AS
    SELECT 
        `CE`.`IDcalEquip` AS `IDcalEquip`,
        `CERT`.`cert_number` AS `CertNumber`,
        `CE`.`AssetID` AS `AssetID`,
        `CE`.`Mfr` AS `Mfr`,
        `CE`.`Model` AS `Model`,
        `CE`.`Descr` AS `Descr`,
        `CE`.`Type` AS `Type`,
        `CE`.`SN` AS `SN`,
        `CERT`.`effect_date` AS `LastCal`,
        `CERT`.`expire_date` AS `CalDue`,
        `CE`.`Status` AS `Status`,
        `CERT`.`id_certification` AS `CertID`
    FROM
        (`cal_equipment` `CE`
        LEFT JOIN `certification` `CERT` ON ((`CERT`.`id_certification` = `CE`.`id_certification`)))
    WHERE
        (`CE`.`Status` = 'Active')
    ORDER BY `CERT`.`expire_date` DESC , `CE`.`AssetID`