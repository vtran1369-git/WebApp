CREATE DEFINER=`sprocHandler`@`localhost` PROCEDURE `updateCEstdCal`(CEIDin INT UNSIGNED, CertNumIn VARCHAR(45), CalDateIn DATE, CalDueIn DATE)
BEGIN
DECLARE		DEBUG			BOOLEAN DEFAULT FALSE;
DECLARE		ERRMSG			VARCHAR(128) DEFAULT NULL;
DECLARE		CertNewID		INT UNSIGNED DEFAULT NULL;
DECLARE		CountOldCert	INT UNSIGNED DEFAULT NULL;
MAIN: BEGIN

#		Incoming Data Validation
IF	CEIDin IS NULL THEN SET ERRMSG='ERR:No Cal Equipment ID provided.';  LEAVE MAIN; END IF;
IF	( SELECT COUNT(IDcalEquip)
    FROM	pegasus.cal_equipment
    WHERE	IDcalEquip = CEIDin ) <1 THEN
    SET ERRMSG = 'ERR:Invalid Cal Equipment ID.'; LEAVE MAIN; END IF;
IF	CertNumIn IS NULL THEN SET ERRMSG = 'ERR:No New Cert Number Provided.'; LEAVE MAIN; END IF;
IF	CalDateIn IS NULL THEN SET ERRMSG = 'ERR:No Cal Date Provided.'; LEAVE MAIN; END IF;
#		If there is no Cal Due date incoming, set to default of CalDate + 1 year
IF	CalDueIn IS NULL THEN SET CalDueIn = date_add(CalDateIn, INTERVAL 1 YEAR); END IF;

START TRANSACTION;

INSERT INTO pegasus.certification (
			cert_number,
			device_description,
			device_serial,
			IDcal_equipment,
			ID_hw_deployment,
			ID_cert_type,
			effect_date,
			expire_date)
SELECT		CertNumIn,
			CE.Descr,
            CE.SN,
            CEIDin,
            CE.id_client,
            1,
            CalDateIn,
            CalDueIn
FROM		pegasus.cal_equipment CE
WHERE		CE.IDcalEquip = CEIDin;

SET CertNewID = LAST_INSERT_ID();

IF	CertNewID IS NOT NULL THEN
UPDATE	pegasus.cal_equipment
SET		id_certification = CertNewID
WHERE	IDcalEquip = (
			SELECT	IDcal_equipment
            FROM	certification
            WHERE	id_certification = CertNewID);        
ELSE SET ERRMSG = 'ERR:Could not insert entry in certification table.  NULL ID returned.'; LEAVE MAIN; END IF;

END MAIN;
IF ERRMSG IS NOT NULL THEN ROLLBACK; SELECT ERRMSG;
ELSE COMMIT; SELECT CertNewID;
END IF;
END