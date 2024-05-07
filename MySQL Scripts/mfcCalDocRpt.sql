CREATE DEFINER=`sprocHandler`@`localhost` PROCEDURE `mfcCalDocRpt`(IDmfcCalIn INT UNSIGNED)
BEGIN

#Declare vars common to both forms
/*
DECLARE			calDate		VARCHAR(9) DEFAULT FinesseDate(NOW());
DECLARE			CustGUID	VARCHAR(36);
DECLARE			AsFoundLeft,
				Operator,
				custName,
                dutMfr,
                dutModel,
                dutSN,
                procGas,
                refMtrMfr,
                refMtrModel,
                refMtrSN,
                refBlocSN	VARCHAR(45) DEFAULT NULL;
DECLARE			IDMFCR,
				IDPPL,
                IDCUST,
                IDTESTREF,
                IDTESTBLOC,
                IDMFR		INT UNSIGNED;
DECLARE			DEBUG		BOOLEAN DEFAULT FALSE;
DECLARE			ASFOUND		BOOLEAN DEFAULT FALSE;
                
SELECT	MCR.IDmfcRegistry, MCR.IDpeople, MCR.IDcust, sys.BinaryToGUID(MCR.custGUID), MCR.IDtestRef, MCR.IDtestBloc, MCR.asFoundLeft
FROM	mfc_cal_registry MCR
WHERE	MCR.IDmfcCal=IDmfcCalIn
INTO	IDMFCR,IDPPL,IDCUST,CustGUID,IDTESTREF,IDTESTBLOC,AsFoundLeft;

IF	CustGUID IS NULL THEN SET CustGUID = (
	SELECT	IntCustGUID
	FROM	IntuitiveCustomer
	WHERE	IntCustID = IDCUST
	LIMIT 1);
END IF;

IF DEBUG THEN SELECT IDMFCR,IDPPL,IDCUST,CustGUID,IDTESTREF,IDTESTBLOC,AsFoundLeft; END IF;

IF AsFoundLeft = 'FOUND' THEN SET ASFOUND = TRUE; END IF;

SELECT	MR.IDmfr
FROM	pegasus.mfc_registry MR
WHERE	MR.IDmfc = IDMFCR
INTO	IDMFR;
                
#Query common vars
SELECT		FinesseDate(MCR.calDTG) AS `Cal Date`,
			CONCAT(PPL.firstName, ' ', PPL.lastName) AS `Tech`,
            CUST.name AS `Customer`,
            ADDR.name AS `MFC Mfr`,
            MR.model AS `MFC Model`,
            MR.sn AS `MFC SN`,
            MCR.procGas AS `Proc Gas`,
            CE.Mfr AS `Mfr TestEquip`,
            CE.Model AS `TestEquip Model`,
            CE.SN AS `TestEquip SN`,
            CE2.SN AS `TestBlock SN`
FROM		pegasus.mfc_cal_registry MCR
LEFT JOIN		pegasus.mfc_registry MR ON MR.IDmfc = IDMFCR
LEFT JOIN		pegasus.IntuitiveCustomer CUST ON CUST.IntCustGUID = CustGUID
LEFT JOIN		pegasus.cal_equipment CE ON CE.IDcalEquip = IDTESTREF
LEFT JOIN		pegasus.cal_equipment CE2 ON CE2.IDcalEquip = IDTESTBLOC
LEFT JOIN		control.people PPL ON PPL.IDpeople = IDPPL
LEFT JOIN		pegasus.addresses ADDR ON ADDR.id_addresses = IDMFR
WHERE		MCR.IDmfcCal = IDmfcCalIn
INTO		calDate,
			Operator,
			custName,
			dutMfr,
			dutModel,
			dutSN,
			procGas,
			refMtrMfr,
			refMtrModel,
			refMtrSN,
			refBlocSN;
            
IF Operator = 'Chou Thao' THEN SET Operator = 'Geoffrey Burke'; END IF;		#	Burkert Operator Alias

SELECT		# CC.certID
			IF(ASFOUND,'FOUND',MCR.CertNumber) `CertNum`,
			IF(ASFOUND,'FOUND',calDate) `CalDate`,
            IF(ASFOUND,'FOUND',UPPER(DATE_FORMAT(MR.calDueDate, '%d%b%Y'))) `NextCal`,
            # CC.custInfo
            IF(ASFOUND,'FOUND',custName) `Customer`,
            IF(ASFOUND,'FOUND',CUST.address) `Address1`,
            IF(ASFOUND,'FOUND',CONCAT(CUST.city, ', ', CUST.state, ' ', CUST.postalCode)) `Address2`,
            IF(ASFOUND,'FOUND',CUST.country) `Address3`,
            '' `Address4`,
            IF(ASFOUND,'FOUND','') `Contact`,
            
            # CC.DUTid
			IF(ASFOUND,'FOUND',dutMfr) `DUT Mfr`,
			IF(ASFOUND,'FOUND',dutModel) `DUT model`,
            'Mass Flow Controller' `DUT Descr`,
			IF(ASFOUND,'FOUND',dutSN) `DUT SN`,
            IF(ASFOUND,'FOUND',procGas) `Proc Gas`,
            IF(ASFOUND,'FOUND',RIGHT(dutFlowRange, LENGTH(dutFlowRange)-5)) `DUTMaxFlow`,
            
            # CC.Standards
            IF(ASFOUND,'FOUND',CE.Mfr) `DigMeterMfr`,
            IF(ASFOUND,'FOUND',CE.Model) `DigMeterModel`,
            IF(ASFOUND,'FOUND',CE.SN) `DigMeterSN`,
            IF(ASFOUND,'FOUND',CE.Descr) `DigMeterDescr`,
            IF(ASFOUND,'FOUND',UPPER(DATE_FORMAT(CERT.effect_date, '%d%b%Y'))) `DigMeterLastCal`,
            IF(ASFOUND,'FOUND',UPPER(DATE_FORMAT(CERT.expire_date, '%d%b%Y'))) `DigMeterDueCal`,
            IF(ASFOUND,'FOUND',CE2.Mfr) `BlocFMMfr`,
            IF(ASFOUND,'FOUND',CE2.Model) `BlocFMModel`,
            IF(ASFOUND,'FOUND',CE2.SN)`BlocFMSN`,
            IF(ASFOUND,'FOUND',CE2.Descr)`BlocFMDescr`,
            IF(ASFOUND,'FOUND',UPPER(DATE_FORMAT(CERT2.effect_date, '%d%b%Y'))) `BlocFMLastCal`,
            IF(ASFOUND,'FOUND',UPPER(DATE_FORMAT(CERT2.expire_date, '%d%b%Y'))) `BlocFMDueCal`,
            
            # CC.Remarks
            #IF(ASFOUND,'FOUND',MCR.foundOutTol) `FoundOutTol?`,
            '',
            #	Found out of tolerance
            #'',
            #'' `P/F?`,														#	Need to be removed
            '',
            IF(ASFOUND,'FOUND',CERT3.remarks) 'Remarks',
            
            # CC.Names & Sigs
            IF(ASFOUND,'FOUND',Operator) `TechName`,
            IF(ASFOUND,'FOUND',PPL.signature) `TechSig`,
            IF(ASFOUND,'FOUND',FinesseDate(MCR.opSignDate)) `TechDate`,
            IF(ASFOUND,'FOUND',CONCAT(PPL2.firstName, ' ', PPL2.lastName)) `QAName`,
            IF(ASFOUND,'FOUND',PPL2.signature) `QAsig`,
            IF(ASFOUND,'FOUND',FinesseDate(MCR.qaSignDate)) `QAdate`,
            
            # ROC.date/op
            calDate `Date`,
            `Operator`,
            
            # ROC.dut
            dutMfr `DUTmfr`,
			dutModel `DUTmodel`,
			dutSN `DUTsn`,
            MCR.dutFlowRange`DUTFlowRange`,
            MCR.dutOutputRange`DUTOutputRange`,
            MCR.dutTolerance`DUTtolerance`,
            MCR.procGas`DUTProcGas`,
            MCR.KFactor`K-Factor`,
            MCR.dutAddress`Address`,
            
            # ROC.reference
			CE.Mfr `DigMeterMfr`,
            CE.Model `DigMeterModel`,
            CE.SN `DigMeterSN`,
            MCR.testRefRange `BlocRange`,
            CE2.SN`BlocSN`,
            MCR.suppPress `SuppPress`,
            MCR.testGas `TestGas`,
            custName `CustomerName`,
            
            #	ROC.AsFound/Left
            MCR.asFoundLeft `As F/L`
            
#	CE		CalEquipment for DigitalFMDisplay
#	CE2		CalEquipment for FlowMeter bloc
#	CERT	Certification for DigitalFMDisplay
#	CERT2	Certification for FlowMeter bloc
#	PPL		People for technician
#	PPL2	People for QA

FROM		pegasus.mfc_cal_registry MCR
LEFT JOIN	pegasus.mfc_registry MR ON MR.IDmfc = IDMFCR
LEFT JOIN	control.people PPL ON PPL.IDpeople = IDPPL							#	Technician Record
LEFT JOIN	control.people PPL2 ON PPL2.IDpeople = MCR.IDpplQA					#	QA Approver Record
LEFT JOIN	pegasus.addresses ADDR ON ADDR.id_addresses = IDMFR					#	MFC Manufacturer Record
LEFT JOIN	pegasus.cal_equipment CE ON CE.IDcalEquip = IDTESTREF				#	Molbox Record
LEFT JOIN	pegasus.cal_equipment CE2 ON CE2.IDcalEquip = IDTESTBLOC			#	Molbloc Record
LEFT JOIN	pegasus.certification CERT ON CERT.id_certification = CE.id_certification		#	Cert for Molbox
LEFT JOIN	pegasus.certification CERT2 ON CERT2.id_certification = CE2.id_certification	#	Cert for Molbloc
LEFT JOIN	pegasus.certification CERT3 ON MCR.CertNumber = CERT3.cert_number				#	Cert for this cal, if already created
LEFT JOIN	pegasus.IntuitiveCustomer CUST ON IntCustGUID = CustGUID
WHERE		MCR.IDmfcCal = IDmfcCalIn
LIMIT 1;
*/

SELECT	refFlow AS "Ref Flow",
		dutFlow AS "DUT Flow",
        deltaFlow AS "DUT-Ref",
        err AS "Error (%fs)",
        dutOutput AS "DUT Output",
        status AS "Status"
FROM	_data_mfc_cal
WHERE	IDmfcCalRegistry = IDmfcCalIn
ORDER BY IDmfcCal;


END