let express = require('express');
let router = express.Router();

const { verifySignUp, authJwt } = require('../middleware');
const controller = require('../controllers/auth.controller');
const controllerAdmin = require('../controllers/auth_admin.controller')

const wo_registry = require('../controllers/wo_registry.controller.js');
const intuitveWO = require('../controllers/intuiveWO.js')

const customers = require('../controllers/customers.controller.js');
const cdmList = require('../controllers/cdmlist.controller');
const mfc_registry = require('../controllers/mfc_registry.controller');
const addresses = require('../controllers/addresses.controller');
const mfc_cal_registry = require('../controllers/mfc_cal_registry.controller');
const mfc_cal_equipment = require('../controllers/mfc_cal_equipment.controller');
const loginController = require('../controllers/login.controller');
const truFlowTraveler = require('../controllers/truflow_traveler.controller');
const agitatorTraveler= require('../controllers/agitator_etraveler.controller.js');
const people = require('../controllers/people.controller.js')

/* const authJwt = require('./verifyJwtToken');
const controller = require('../controllers/controller.js');
router.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
router.post('/api/auth/signin', controller.signin);
router.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
router.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
router.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
 
 */

// router.post('/api/workorder/create', wo_registry.create);
// router.get('/api/workorder/all', wo_registry.retrieveAll); //just get 3 data limits
// router.post('/api/workorder/all', wo_registry.getLimitAll);
router.post('/api/workorder/all', intuitveWO.getLimitAll);
/* router.get('/api/workorder/wo_nums', wo_registry.getwo_nums);
router.get('/api/workorder/onebyid/:id', wo_registry.getWOById); */
//just comment out 10/24/2023 and add new onebywo
// router.post('/api/workorder/onebyid/:id', wo_registry.getWOById);
router.get('/api/workorder/:id', intuitveWO.getbyWOID);

// router.get('/api/customers/all', customers.retrieveAll);
router.get('/api/customers', customers.getAll);
router.post('/api/customers', customers.create);
// router.get('/api/cdm/all', cdmList.getAll);
// router.post('/api/newmfc', mfc_registry.create);
router.post('/api/mfc', mfc_registry.create);
router.get('/api/addresses', addresses.getAll);

router.post('/api/mfccal/create', mfc_cal_registry.create);
// router.get('/api/mfccal/all', mfc_cal_registry.getAll);
// router.get('/api/mfccal/all/:recordCount', mfc_cal_registry.getAll);
router.post('/api/mfccal/getByWO', mfc_cal_registry.getByWO)
router.post('/api/mfccal/getBySN', mfc_cal_registry.getBySN)
// router.post('/api/mfccal/limitall', mfc_cal_registry.getLimitAll, [authJwt.verifyToken])
router.post('/api/mfccal/all/', mfc_cal_registry.getLimitAll)

// router.get('/api/mfccal/all/:recordCount', [authJwt.verifyToken], mfc_cal_registry.getAll);
router.get('/api/mfccal/onebyid/:id', mfc_cal_registry.getById);
router.put('/api/mfccal/update/:id', mfc_cal_registry.updateById);

router.put('/api/mfccal/cert/create/:id', mfc_cal_registry.createNewCertNUpdateCalReg);
router.get('/api/mfccal/cert/getcert/:id', mfc_cal_registry.getCertById);
router.get('/api/mfccal/cert/getreport/:id', mfc_cal_registry.getCalRptById);
// router.post('/api/mfccal/cert/equipment/all', [authJwt.verifyToken], mfc_cal_equipment.getAll);
router.get('/api/mfccal/cert/equipment/all', mfc_cal_equipment.getAll);
router.put('/api/mfccal/cert/equipment/update/:id', mfc_cal_equipment.upDateCE);
router.post('/api/mfccal/cert/equipment/upload', mfc_cal_equipment.upLoad);
router.get('/api/mfccal/cert/equipment/download/:id', mfc_cal_equipment.download);

router.post('/api/login', loginController.getToken);
//added secure user login
// router.post('/api/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
// router.post('/api/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail, controller.signup]);
router.post('/api/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail, controllerAdmin.signup]);
router.post('/api/auth/signin', controllerAdmin.signin);
router.post('/api/auth/update', controllerAdmin.update);
// router.post('/api/auth/signin', controller.signin);

router.get('/api/traveler/truflow/onebyid/:id', truFlowTraveler.getById);
// router.get('/api/traveler/truflow/all', truFlowTraveler.getAll);
router.get('/api/traveler/truflow/mfcs/:id', truFlowTraveler.getMFCsById);
router.post('/api/traveler/truflow/limitall', truFlowTraveler.getLimitAll);
// router.post('/api/traveler/truflow/limitall', [authJwt.verifyToken], truFlowTraveler.getLimitAll);
router.put('/api/traveler/truflow/test/:id', truFlowTraveler.updateTestEventRegistryById);
router.post('/api/traveler/truflow/gettflbysn', truFlowTraveler.getTFLbySN);

router.post('/api/traveler/agitator/new', agitatorTraveler.create);
router.post('/api/traveler/agitator/all', agitatorTraveler.getAll)
router.get('/api/traveler/agitator/:id', agitatorTraveler.getById)
router.put('/api/traveler/agitator/update/:id', agitatorTraveler.updateById);

router.get('/api/people/onebyid/:id', people.getById)
router.post('/api/people/manybyids/', people.getManyByIds)

module.exports = router;