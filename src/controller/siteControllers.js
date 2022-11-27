const {
  payrollemployeesSevices,
  totalEarningSevices,
  PersonalSqlSeverServices,
  benefitPlanSevices,
  jobHistorySevices,
} = require('../services/siteService');
class siteControllers {
  // [GET] REGISTER
  index = (req, res) => {
    return res.status(200).json({
      test: 'test',
    });
  };

  benefits = async (req, res) => {
    try {
      const benefitPlans = await benefitPlanSevices(req, res);
      if (benefitPlans) {
        return res.status(200).json({
          data: benefitPlans,
        });
      } else {
        return res.status(200).json({
          data: [],
        });
      }
    } catch (e) {
      return res.status(500).json({
        message: 'Server error',
      });
    }
  };

  jobHistory = async (req, res) => {
    try {
      const jobHistory = await jobHistorySevices(req, res);
      if (jobHistory) {
        return res.status(200).json({
          data: jobHistory,
        });
      } else {
        return res.status(200).json({
          data: [],
        });
      }
    } catch (e) {
      return res.status(500).json({
        message: 'Server error',
      });
    }
  };

  personals = async (req, res) => {
    try {
      const data = await PersonalSqlSeverServices();
      return res.status(200).json({
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: e,
      });
    }
  };
  payrollemployees = async (req, res) => {
    try {
      const dataPayrollemployees = await payrollemployeesSevices();
      return res.status(200).json({
        data: dataPayrollemployees,
        code: 1,
      });
    } catch (e) {
      return res.status(500).json({
        message: e,
      });
    }
  };
  totalEarning = async (req, res) => {
    try {
      const { data, groupByEmployee } = await totalEarningSevices();
      if (data && groupByEmployee) {
        return res.status(200).json({
         data : groupByEmployee,
          code: 1,
        });
      } else {
        return res.status(500).json({
          message: 'no data',
          code: 0,
        });
      }
    } catch (e) {
      return res.status(500).json({
        message: e,
      });
    }
  };
}

module.exports = new siteControllers();
