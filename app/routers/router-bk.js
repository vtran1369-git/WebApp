let express = require('express');
let router = express.Router();

const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
const controller = require('../controllers/controller.js');
const wo_registry = require('../controllers/wo_registry.controller.js');
const customers = require('../controllers/customers.controller.js');
const cdmList = require('../controllers/cdmlist.controller');
const mfc_registry = require('../controllers/mfc_registry.controller');
const addresses = require('../controllers/addresses.controller');
const mfc_cal_registry = require('../controllers/mfc_cal_registry.controller');

router.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
router.post('/api/auth/signin', controller.signin);
router.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
router.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
router.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
 


// router.post('/api/workorder/create', wo_registry.create);
router.get('/api/workorder/all', wo_registry.retrieveAll); //just get 3 data limits
router.get('/api/workorder/onebyid/:id', wo_registry.getWOById);
router.post('/api/workorder/onebyid/:id', wo_registry.getWOById);
router.get('/api/workorder/filteringbywo', wo_registry.filteringByWO);
router.get('/api/workorder/pagination', wo_registry.pagination);
router.get('/api/workorder/pagefiltersort', wo_registry.pagingfilteringsorting);
router.put('/api/workorder/update/:id', wo_registry.updateById);
router.delete('/api/workorder/delete/:id', wo_registry.deleteById);

// router.get('/api/customers/all', customers.retrieveAll);
router.get('/api/customers', customers.getAll);
router.post('/api/customers', customers.create);
router.get('/api/cdm/all', cdmList.getAll);
// router.post('/api/newmfc', mfc_registry.create);
router.post('/api/mfc', mfc_registry.create);
router.get('/api/addresses', addresses.getAll);

router.post('/api/mfccal/create', mfc_cal_registry.create);
router.get('/api/mfccal/all', mfc_cal_registry.getAll);
router.get('/api/mfccal/onebyid/:id', mfc_cal_registry.getById)
router.put('/api/mfccal/update/:id', mfc_cal_registry.updateById)
router.get('/api/mfccal/getcert/:id', mfc_cal_registry.getCertById)
//router.get('/api/mfccal/newcert/:id', mfc_cal_registry.createNewCertNUpdateCalReg)

module.exports = router;