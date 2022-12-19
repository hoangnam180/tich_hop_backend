const express = require('express');
const siteControllers = require('../controller/siteControllers');
const router = express.Router();

router.get('/total-earning', siteControllers.totalEarning);
router.get('/payrollemployees', siteControllers.payrollemployees);
router.get('/personals', siteControllers.personals);
router.get('/benefits', siteControllers.benefits);
router.get('/job-history', siteControllers.jobHistory);
router.get('/pay-rate', siteControllers.payRateId);
router.get('/ethnicity', siteControllers.getEthnicity);
router.get('/deductable', siteControllers.getDeductable);
router.get('/benefit', siteControllers.getBenefit);
router.post('/total-earning', siteControllers.addTotalEarning);
router.put('/total-earning/:id', siteControllers.updateTotalEarning);
router.delete('/total-earning/:id', siteControllers.deleteTotalEarning);
router.get('/', siteControllers.index);

module.exports = router;
