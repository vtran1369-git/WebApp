CREATE DEFINER=`sprocHandler`@`localhost` PROCEDURE `[EWOI]MFCqueryByFSN`(FSNin varchar(45))
BEGIN
/*
***********************************************************************************************
*
The reason for a separate DEBUG verion is so QA can continue to use the nono-debug version
While we troubleshoot errant data.
*
***********************************************************************************************
*/
DECLARE		FSNID,
			MFCID,
			TestID,
            WOID		INT UNSIGNED DEFAULT NULL;
DECLARE		loopCounter	INT DEFAULT 0;
DECLARE		DEBUG		BOOLEAN DEFAULT FALSE;

DROP TEMPORARY TABLE IF EXISTS MFCs;
CREATE TEMPORARY TABLE MFCs(
	id			INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    MFCID		INT UNSIGNED NOT NULL,
    FlowStr		VARCHAR(45) DEFAULT NULL,
    Gas			VARCHAR(25) NOT NULL,
    SN			INT UNSIGNED NOT NULL,
    mfrID		INT UNSIGNED NOT NULL,
    calID		INT UNSIGNED NOT NULL,
    calDate		DATE NOT NULL,
    calName		varchar(45),
    QAdate		DATE NOT NULL,
    QAname		varchar(45),
    IDmatCert	varchar(256) NULL
);

SELECT	MAX(FSN.id_finesse_serial_number),
		MAX(TR.id_test_event_registry),
        MAX(WO.id_wo_registry)
FROM	pegasus.finesse_serial_number FSN
JOIN	pegasus.test_event_registry TR ON TR.id_finesse_serial_number = FSN.id_finesse_serial_number
JOIN	pegasus.wo_registry WO ON WO.id_wo_registry = FSN.id_wo_registry
WHERE	FSN.fsn_string = FSNin AND FSN.status NOT IN('NEW', 'RETURN', 'VOID')
#	AND test event didnt get cancelled by the operator!!!
LIMIT 1
INTO 	FSNID, TestID, WOID;
IF DEBUG THEN SELECT FSNID, TestID, WOID; END IF;

INSERT INTO MFCs ( mfrID, SN )
SELECT	MI.dev_id, MI.serial_num
FROM	pegasus.mfc_info MI
WHERE	MI.id_test_event_registry = TestID;

UPDATE MFCs
SET MFCs.MFCID = (
	SELECT MAX(MFCR.IDmfc) FROM pegasus.mfc_registry MFCR
    WHERE MFCR.mfrDevID = MFCs.mfrID AND MFCR.sn = MFCs.SN);

UPDATE MFCs
SET	calID = (
	SELECT	MAX(CAL.IDmfcCal)
	FROM	pegasus.mfc_cal_registry CAL
	WHERE	CAL.IDmfcRegistry = MFCs.MFCID AND
			CAL.opSignDate IS NOT NULL),
    MFCs.IDmatCert = (
	SELECT	MFCR.IDcertMaterial
    FROM	pegasus.mfc_registry MFCR
    WHERE	MFCR.IDmfc = MFCs.MFCID);

UPDATE	MFCs
LEFT JOIN	mfc_cal_registry CR ON MFCs.calID = CR.IDmfcCal
LEFT JOIN	control.people PPL1 ON PPL1.IDpeople = CR.IDpeople
LEFT JOIN	control.people PPL2 ON PPL2.IDpeople = CR.IDpplQA
SET		MFCs.FlowStr = CR.dutFlowRange,
		MFCs.Gas = CR.procGas,
        MFCs.calDate = CAST(CR.calDTG AS DATE),
        MFCs.calName = (CASE
			WHEN CONCAT( PPL1.firstName, ' ', PPL1.lastName) = 'Chou Thao' THEN 'Geoffrey Burke'	#	Burkert Cal Engineer Alias
            ELSE CONCAT( PPL1.firstName, ' ', PPL1.lastName) END),
        MFCs.QAdate = CR.qaSignDate,
        MFCs.QAname = CONCAT( PPL2.firstName, ' ', PPL2.lastName);

SELECT * FROM MFCs;
#IF DEBUG = FALSE THEN DROP TEMPORARY TABLE MFCs; END IF;
END