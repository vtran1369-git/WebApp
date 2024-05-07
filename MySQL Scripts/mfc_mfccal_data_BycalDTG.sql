CREATE DEFINER=`sprocHandler`@`localhost` PROCEDURE `mfc_mfccal_data_BycalDTG`(IN byCalDateIn DATETIME)
BEGIN
	SELECT IDmfc, CR.IDmfcCal, sn, model, WOnum, calDTG, DC.status
	FROM mfc_cal_registry CR 
	JOIN mfc_registry R ON  R.IDmfc = CR.IDmfcRegistry
	JOIN _data_mfc_cal DC ON DC.IDmfcCalRegistry =CR.IDmfcCal
	WHERE asFoundLeft = 'LEFT' 
	AND calDTG >= byCalDateIn AND calDTG < byCalDateIn + interval 1 day ORDER BY caldtg ASC;
END