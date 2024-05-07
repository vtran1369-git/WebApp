CREATE DEFINER=`sprocHandler`@`localhost` PROCEDURE `truFlowTraveler`(FSNin VARCHAR ( 45 ))
BEGIN
#	Behavior Switches
DECLARE		DOTEST_3p1		BOOLEAN DEFAULT TRUE;
DECLARE		DOTEST_3p3		BOOLEAN DEFAULT TRUE;
DECLARE		DOTEST_3p4		BOOLEAN DEFAULT TRUE;
DECLARE		DOTEST_3P5		BOOLEAN DEFAULT FALSE;
DECLARE		DOTEST_3P6		BOOLEAN DEFAULT FALSE;
DECLARE		DOTEST_3P7		BOOLEAN DEFAULT FALSE;
DECLARE		DEBUG			BOOLEAN DEFAULT FALSE;

#	LocalVars
DECLARE		mfcChannel,
			mfcOutlet		VARCHAR(5);
DECLARE		testName,
			chnlName		VARCHAR(20) DEFAULT '';
DECLARE		PCBApn,
			PCBArev,
			FWpn,
			FWrev,
			CPLDpn,
			CPLDrev,
			FactEEpn,
			FactEErv,
			UsrEEpn,
			UsrEErv,
			tableColName	VARCHAR(45);
DECLARE		Str1,
			Str2,
			Str3			VARCHAR(255) DEFAULT '';
DECLARE		numChannels,
			numOutlets,
			rowCounter,
			loopCounter		INT DEFAULT 0;
DECLARE		complete		INT DEFAULT FALSE;
DECLARE		FSNID,
			TestID,
			SpecIndxID		INT UNSIGNED;
DECLARE		LimitLo,
			LimitHi,
			dataPoint		FLOAT;

#	Declare cursor for raw data query - used for Pass/Fail indicators on traveler
DECLARE		rawData			CURSOR FOR 	SELECT 	_data_raw_tfpts.data_name, _data_raw_tfpts.data
										FROM	_data_raw_tfpts
										WHERE	_data_raw_tfpts.id_test_event_registry = TestID
										AND		_data_raw_tfpts.parent_test = testName;

DECLARE	CONTINUE HANDLER FOR NOT FOUND SET
	complete = TRUE;

#	Drop and Create the Header and PF Array Tables
DROP TEMPORARY TABLE IF EXISTS truFlowHeader;
CREATE TEMPORARY TABLE truFlowHeader (
	Vendor				VARCHAR(45) NULL DEFAULT '',
	OrigDate			VARCHAR(10) NULL DEFAULT '',
	TechName 			VARCHAR(45) NULL DEFAULT '',
	WOnum				VARCHAR(15) NULL DEFAULT '',
	ModelNumber			VARCHAR(45) NULL DEFAULT '',
	ModRev				VARCHAR(45) NULL DEFAULT '',
	FSN					VARCHAR(45) NULL DEFAULT '',
	configCode			VARCHAR(45) NULL DEFAULT '',
	PCBAsn				VARCHAR(45) NULL DEFAULT '',
	PCBApn				VARCHAR(15) DEFAULT 'N/A',
	PCBArev				VARCHAR(5) DEFAULT 'N/A',
	FirmWarePN			VARCHAR(45) NULL DEFAULT '',
	FirmwareRev			VARCHAR(45) NULL DEFAULT '',
	CPLDpn				VARCHAR(45) NULL DEFAULT '',
	CPLDrev				VARCHAR(45) NULL DEFAULT '',
	FactEepromPN		VARCHAR(45) DEFAULT 'N/A',
	FactEepromVer		VARCHAR(45) DEFAULT 'N/A',
	UserEepromPN		VARCHAR(45) DEFAULT 'N/A',
	UserEepromVer		VARCHAR(45) DEFAULT 'N/A',
	TechSig				MEDIUMBLOB,
	TechDTG				VARCHAR(10),
	QASig				MEDIUMBLOB NULL,
	QADTG				VARCHAR(10) NULL,
	Comments			VARCHAR(2048) NULL
);

DROP TEMPORARY TABLE IF EXISTS TFPFAry;
CREATE TEMPORARY TABLE TFPFAry (
	ch		TINYINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	hs		TINYINT UNSIGNED DEFAULT 2,
	sp1		TINYINT UNSIGNED DEFAULT 2,
	sp2		TINYINT UNSIGNED DEFAULT 2
);

#	Query all static info into local vars
LoadVars:BEGIN
	#		FSNID
	SELECT 	MAX(finesse_serial_number.id_finesse_serial_number)
	FROM 	finesse_serial_number
	WHERE	finesse_serial_number.fsn_string = FSNin
	INTO	FSNID;
IF DEBUG THEN SELECT FSNID;END IF;
	#		TestID
	SELECT	MAX(_data_tfpts.id_test_event_registry)
	FROM	_data_tfpts
	JOIN	test_event_registry ON test_event_registry.id_test_event_registry = _data_tfpts.id_test_event_registry
	WHERE	test_event_registry.id_finesse_serial_number = FSNID
	INTO	TestID;
IF DEBUG THEN SELECT TestID;END IF;
	#		SpecIndxID
	SELECT	test_event_registry.spec_index_id
	FROM	test_event_registry
	WHERE	test_event_registry.id_test_event_registry = TestID
	INTO	SpecIndxID;
IF DEBUG THEN SELECT SpecIndxID;END IF;
	#		numChannels
	SELECT 	COUNT(*)
	FROM	mfc_info
	WHERE	mfc_info.id_truflow_fsn = FSNID
	AND		mfc_info.id_test_event_registry = TestID			#	This will break if additional channels are added / replaced in the field.
	INTO	numChannels;
IF DEBUG THEN SELECT numChannels;END IF;
	#		numOutlets
	SELECT COUNT(DISTINCT(_data_raw_tfpts.data_name))
	FROM	_data_raw_tfpts
	WHERE	_data_raw_tfpts.data_name IN ('HS', 'SP1', 'SP2')
	AND		_data_raw_tfpts.id_test_event_registry = TestID
	INTO	numOutlets;
IF DEBUG THEN SELECT numOutlets;END IF;

	#		FWpn and FWrev
	SELECT 	firmware_repository.part_num,
			firmware_repository.revision
	FROM 	firmware_repository
	WHERE 	firmware_repository.id_firmware_repository = (
		SELECT	_data_tfpts.id_frmwr_$1p5
		FROM	_data_tfpts
		WHERE	_data_tfpts.id_test_event_registry = TestID
        LIMIT 1 )
	INTO FWpn, FWrev;
IF DEBUG THEN SELECT FWpn, FWrev;END IF;

	#		CPLDpn, CPLDrev
	SELECT 	firmware_repository.part_num,
			firmware_repository.version
	FROM 	firmware_repository
	WHERE 	firmware_repository.id_firmware_repository = (
		SELECT	_data_tfpts.id_cpld_$1p4
		FROM	_data_tfpts
		WHERE	_data_tfpts.id_test_event_registry = TestID
        LIMIT 1 )
	INTO CPLDpn, CPLDrev;

IF DEBUG THEN SELECT CPLDpn, CPLDrev;END IF;

	IF DEBUG THEN SELECT FSNID, TestID, SpecIndxID, numChannels, numOutlets, FWpn, FWrev, CPLDpn, CPLDrev; END IF;
END LoadVars;

#	Load the Header Table
Header:BEGIN
	INSERT INTO truFlowHeader (
		truFlowHeader.Vendor,
		truFlowHeader.OrigDate,
		truFlowHeader.TechName,
		truFlowHeader.WOnum,
		truFlowHeader.ModelNumber,
		truFlowHeader.ModRev,
		truFlowHeader.FSN,
		truFlowHeader.configCode,

		truFlowHeader.PCBAsn,
		truFlowHeader.PCBApn,
		truFlowHeader.PCBArev,
		truFlowHeader.FirmWarePN,
		truFlowHeader.FirmwareRev,
		truFlowHeader.CPLDpn,
		truFlowHeader.CPLDrev,
		truFlowHeader.FactEepromPN,
		truFlowHeader.FactEepromVer,
		truFlowHeader.UserEepromPN,
		truFlowHeader.UserEepromVer,

		truFlowHeader.TechSig,
		truFlowHeader.TechDTG,
		truFlowHeader.QASig,
		truFlowHeader.QADTG,
		truFlowHeader.Comments
	) SELECT
		addresses.name,
		UPPER(FinesseDate(finesse_serial_number.dtg)),
		UserFullName( test_event_registry.id_user_registry ),
		wo_registry.wo_num,
		wo_registry.agilePartNum,
		finesse_serial_number.rev,
		finesse_serial_number.fsn_string,
		finesse_serial_number.config_code,
		_data_tfpts.pcb_sn_$1p1,
		'N/A',										#PCBApn,
		'N/A',										#PCBArev,
		FWpn,
		FWrev,
		CPLDpn,
		CPLDrev,
		'N/A',										#FactEEpn,
		'N/A',										#FactEErv,
		'N/A',										#UsrEEpn,
		'N/A',										#UsrEErv,
		(SELECT PPL.signature FROM control.people PPL WHERE IDpeople = (
			SELECT test_event_registry.id_user_registry)),
		UPPER(FinesseDate(test_event_registry.dtg)),
		(SELECT PPL.signature FROM control.people PPL WHERE IDpeople = (
			SELECT test_event_registry.id_user_qa)),
		UPPER(FinesseDate(test_event_registry.qa_dtg)),
		test_event_registry.comments
	FROM	addresses
	JOIN	finesse_serial_number ON finesse_serial_number.id_finesse_serial_number = FSNID
	JOIN	test_event_registry ON test_event_registry.id_test_event_registry = TestID
	JOIN	wo_registry ON wo_registry.id_wo_registry = finesse_serial_number.id_wo_registry
	JOIN	product_group_index ON finesse_serial_number.p_code = CONCAT(product_group_index.group_letters, product_group_index.group_nums)
	JOIN	_data_tfpts ON _data_tfpts.id_test_event_registry = TestID
	WHERE	addresses.id_addresses = (
		SELECT 	vendor_index.id_addresses
		FROM	vendor_index
		WHERE	vendor_index.v_code = (
			SELECT	finesse_serial_number.v_code
            FROM	finesse_serial_number
            WHERE	finesse_serial_number.id_finesse_serial_number = FSNID)
		);
END Header;

#	Load the Hardware Configuration table
HWConfig:BEGIN
	DROP TEMPORARY TABLE IF EXISTS HWtable;
	CREATE TEMPORARY TABLE HWtable
	SELECT 	mfc_info.max_flow,
			mfc_info.units,
			mfc_info.gas,
			mfc_info.serial_num,
			mfc_info.dev_id
	FROM 	mfc_info
	WHERE 	mfc_info.id_test_event_registry = TestID
	AND		mfc_info.serial_num != 0
	ORDER BY mfc_info.id_mfc_info;
END HWConfig;

#	Create and fill the Data Table
TravDataTable:BEGIN
	DROP TEMPORARY TABLE IF EXISTS DataTable;
	CREATE TEMPORARY TABLE DataTable
	SELECT spec.TestElementName,
			spec.SpecReference,
			spec.ColumnName,
			spec.trav_units,
			spec.LimitLo,
			spec.LimitHi,
			_data_tfpts.failure_code,
			spec.trav_row,
			spec.FailCodeBitPos
	FROM spec
	JOIN _data_tfpts ON _data_tfpts.id_test_event_registry = TestID
	WHERE spec.spec_index_id = SpecIndxID
	ORDER BY spec.SpecReference;
IF DEBUG THEN SELECT * FROM DataTable; END IF;

	SET	loopCounter = 0;
	data_fill: LOOP

		SELECT	DataTable.ColumnName 
		FROM 	DataTable
		LIMIT 	loopCounter, 1 
		INTO 	tableColName;

		SET @SQLstmt = CONCAT('
		UPDATE DataTable SET ColumnName = (SELECT ', tableColName, ' FROM _data_tfpts WHERE id_test_event_registry = ', TestID, ') 
										WHERE DataTable.ColumnName = \'', tableColName, '\';');
		#IF DEBUG THEN SELECT @SQLstmt; END IF;
		PREPARE STMT FROM @SQLstmt;
		EXECUTE STMT;

		SET loopCounter = loopCounter +1;
		IF loopCounter > 15 THEN													#WARNING: Constant = number of test data rows
			LEAVE data_fill;
		END IF;
	END LOOP data_fill;

	UPDATE DataTable SET failure_code = failure_code >> DataTable.FailCodeBitPos & 1;
	ALTER TABLE DataTable
		DROP FailCodeBitPos,
		MODIFY COLUMN failure_code VARCHAR(5);
	UPDATE DataTable SET failure_code = 'PASS' WHERE failure_code = '0';
	UPDATE DataTable SET failure_code = 'FAIL' WHERE failure_code = '1';
	UPDATE DataTable SET failure_code = NULL WHERE failure_code = '2';
END TravDataTable;
IF DEBUG THEN SELECT * FROM DataTable; END IF;

#	Fill the Pass/Fail table with values for the LabVIEW indicators
PFary: BEGIN
#	Fill Tables with default values for channels, outlets
	SET Str1 = 'hs,sp1';
	IF	numOutlets = 3 THEN
		SET Str1 = CONCAT(Str1, ',sp2');
		SET Str2 = '(0,0,0)';
	ELSE
		SET Str2 = '(0,0)';
	END IF;

	SET Str3 = CONCAT(Str2, REPEAT(CONCAT(', ',Str2), numChannels *2 -1 ));
	SET @SQLstmt = CONCAT('INSERT INTO TFPFAry ( ', Str1, ' ) VALUES ', Str3,';');
	#IF DEBUG THEN SELECT @SQLstmt; END IF;
	PREPARE STMT FROM @SQLstmt;
	EXECUTE STMT;

	IF DOTEST_3P1 THEN
		comp_leak_down_$3p1:BEGIN

			SET	testName = 'comp_leak_down_$3p1';
			SELECT	spec.LimitLo,
					spec.LimitHi
			FROM	spec
			WHERE	spec.spec_index_id = SpecIndxID
			AND		spec.ColumnName = testName
			INTO	LimitLo, LimitHi;

			SET		rowCounter = 1;
			SET		loopCounter = 0;
			OPEN	rawData;

			procData: LOOP
				FETCH 	rawData
				INTO	chnlName, dataPoint;

				IF complete THEN LEAVE procData;
				END IF;

				#	Check data point against limits, only update PASS->FAIL, in the EVEN rows [for LEAK cols on traveler]
				SET Str1 = 'UPDATE TFPFAry SET ';
				SET Str2 = CONCAT(' = IF( ', dataPoint, ' > ', LimitLo, ' AND ', dataPoint, ' < ', LimitHi, ', 0, 1 ) 
										WHERE ', chnlName, ' <1
										AND ch % 2 = 0;');
				SET @SQLstmt = CONCAT( Str1, LOWER(chnlName), Str2 );
				IF DEBUG THEN SELECT @SQLSTMT; END IF;
				PREPARE STMT FROM @SQLstmt;
				EXECUTE STMT;

				SET loopCounter = loopCounter +1;
				SET rowCounter = FLOOR( loopCounter / numOutlets ) + 1 ;
			END LOOP;
			CLOSE rawData;
		END comp_leak_down_$3p1;
	END IF;

	IF DOTEST_3P3 THEN
		chan_max_flow_$3p3:BEGIN

			SET	testName = 'chan_max_flow_$3p3';
			SELECT	spec.LimitLo,
					spec.LimitHi
			FROM	spec
			WHERE	spec.spec_index_id = SpecIndxID
			AND		spec.ColumnName = testName
			INTO	LimitLo, LimitHi;

			SET complete = FALSE;
			SET		rowCounter = 1;
			SET		loopCounter = 0;
			OPEN	rawData;

			procData: LOOP
				FETCH 	rawData
				INTO	chnlName, dataPoint;

				IF complete THEN LEAVE procData;
				END IF;

				#	Convert the chnlName read from raw table into row [ch] and column [outlet] in output table
				SET mfcChannel = MID(chnlName, 2, 1);
				CASE RIGHT(chnlName, 1)
					WHEN 'a' THEN SET mfcOutlet = 'hs';
					WHEN 'b' THEN SET mfcOutlet = 'sp1';
					WHEN 'c' THEN SET mfcOutlet = 'sp2';
				END CASE;

				#	Check data point against limits, only update PASS->FAIL, in the individual FLOW cels.
				SET Str1 = 'UPDATE TFPFAry SET ';
				SET Str2 = CONCAT(' = IF( ', dataPoint * 10 , ' > ', LimitLo, ' AND ', dataPoint * 10, ' < ', LimitHi, ', 0, 1 ) 
											WHERE ', mfcOutlet, ' <1
											AND ch = ', mfcChannel, ' * 2 - 1;');
				SET @SQLstmt = CONCAT( Str1, mfcOutlet, Str2 );
				IF DEBUG THEN SELECT @SQLSTMT; END IF;
				PREPARE STMT FROM @SQLstmt;
				EXECUTE STMT;

				SET loopCounter = loopCounter +1;
				SET rowCounter = FLOOR( loopCounter / numOutlets ) + 1 ;
			END LOOP;
			CLOSE rawData;
		END chan_max_flow_$3p3;
	END IF;

	IF DOTEST_3P4 THEN
		comp_leak_thru_$3p4:BEGIN

			SET	testName = 'comp_leak_thru_$3p4';
			SELECT	spec.LimitLo,
					spec.LimitHi
			FROM	spec
			WHERE	spec.spec_index_id = SpecIndxID
			AND		spec.ColumnName = testName
			INTO	LimitLo, LimitHi;

			SET complete = FALSE;
			SET		rowCounter = 1;
			SET		loopCounter = 0;
			OPEN	rawData;

			procData: LOOP
				FETCH 	rawData
				INTO	chnlName, dataPoint;

				IF complete THEN LEAVE procData;
				END IF;

				#	Check data point against limits, only update PASS->FAIL, in the EVEN rows [for LEAK cols on traveler]
				SET Str1 = 'UPDATE TFPFAry SET ';
				SET Str2 = CONCAT(' = IF( ', dataPoint, ' > ', LimitLo, ' AND ', dataPoint, ' < ', LimitHi, ', 0, 1 ) 
											WHERE ', chnlName, ' <1
											AND ch % 2 = 0;');
				SET @SQLstmt = CONCAT( Str1, LOWER(chnlName), Str2 );
				IF DEBUG THEN SELECT @SQLSTMT; END IF;
				PREPARE STMT FROM @SQLstmt;
				EXECUTE STMT;

				SET loopCounter = loopCounter +1;
				SET rowCounter = FLOOR( loopCounter / numOutlets ) + 1 ;
			END LOOP;
			CLOSE rawData;
		END comp_leak_thru_$3p4;
	END IF;
ALTER TABLE TFPFAry DROP COLUMN ch;
END PFary;

#	Return the header table.  The other 3 tables are queried in LabVIEW directly to maintain dimensionality
SELECT * FROM truFlowHeader;
IF DEBUG THEN SELECT * FROM HWtable; END IF;
IF DEBUG THEN SELECT * FROM DataTable; END IF;
IF DEBUG THEN SELECT hs, sp1, sp2 FROM TFPFAry; END IF;
END