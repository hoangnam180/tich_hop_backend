const express = require('express');
const siteControllers = require('../controller/siteControllers');
const router = express.Router();

router.get('/total-earning', siteControllers.totalEarning);
router.get('/payrollemployees', siteControllers.payrollemployees);
router.get('/personals', siteControllers.personals);
router.get('/', siteControllers.index);

module.exports = router;
