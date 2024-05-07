CREATE DEFINER=`sprocHandler`@`localhost` PROCEDURE `MFCtechSignCert`(idMFCcalRegIn INT UNSIGNED)
BEGIN

DECLARE	newCertID,
		newCertNum,
		IDCALEQUIP,
		CertType		INT UNSIGNED DEFAULT NULL;

DECLARE	LASTCAL,
		CALDUE			DATE DEFAULT NULL;

DECLARE	DUTSN			VARCHAR(45) DEFAULT NULL;
DECLARE	DESCR			VARCHAR(127) DEFAULT NULL;

DECLARE	DEBUG			BOOLEAN DEFAULT FALSE;

SELECT	id_cert_types
FROM	pegasus.cert_types
WHERE	cert_type = 'MFC'
LIMIT 1
INTO	CertType;

START TRANSACTION;
SELECT	MAX(CAST(CERT.cert_number AS UNSIGNED)) + 1
FROM	pegasus.certification CERT
WHERE	ID_cert_type = 8
INTO	newCertNum;

SELECT	MFC.lastCalDate,
		MFC.calDueDate,
        CONCAT(ADDR.name, ' ', MFC.model, ' MFC, DevID=', MFC.mfrDevID),
        MFC.sn,
        CALREG.IDtestRef
FROM	pegasus.mfc_registry MFC
LEFT JOIN	pegasus.addresses ADDR ON ADDR.id_addresses = MFC.IDmfr
LEFT JOIN	pegasus.mfc_cal_registry CALREG ON CALREG.IDmfcRegistry = MFC.IDmfc
WHERE	CALREG.IDmfcCal = idMFCcalRegIn
INTO	LASTCAL, CALDUE, DESCR, DUTSN, IDCALEQUIP;

INSERT INTO pegasus.certification (
	cert_number,
    device_description,
    device_serial,
    IDcal_equipment,
    ID_cert_type,
    effect_date,
    expire_date
) VALUES (
	CAST(newCertNum AS CHAR),
    DESCR,
    DUTSN,
    IDCALEQUIP,
    CertType,
    LASTCAL,
    CALDUE);

UPDATE	pegasus.mfc_cal_registry CR
SET		CR.CertNumber = newCertNum, CR.opSignDate = CAST(NOW() AS DATE)
WHERE	CR.IDmfcCal = idMFCcalRegIn;
COMMIT;

SELECT	control.fullNameByID(CAL.IDpeople) AS CalName,
		PPL.signature AS Signature,
        CAST(NOW() AS DATE) AS SignDate,
        newCertNum
FROM	pegasus.mfc_cal_registry CAL
JOIN	control.people PPL ON PPL.IDpeople = CAL.IDpeople
WHERE	CAL.IDmfcCal = idMFCcalRegIn;
END