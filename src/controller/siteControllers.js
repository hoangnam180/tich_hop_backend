const {
  payrollemployeesSevices,
  totalEarningSevices,
  PersonalSqlSeverServices,
  benefitPlanSevices,
  jobHistorySevices,
  payRateIdSevices,
  addTotalEarningSevicesMySql,
  EthnicityServices,
  DeductableServices,
  addTotalEarningSevicesSqlSever,
  BenefitServices,
  DeleteMySQLSeverServices,
  DeleteMySqlServices,
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
  payRateId = async (req, res) => {
    try {
      const data = await payRateIdSevices();
      if (data) {
        return res.status(200).json({
          data,
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

  deleteTotalEarning = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await DeleteMySQLSeverServices(id);
      const data2 = await DeleteMySqlServices(id);
      if (data && data2) {
        return res.status(200).json({
          data,
          data2,
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

  totalEarning = async (req, res) => {
    try {
      const { data, groupByEmployee } = await totalEarningSevices();
      if (data && groupByEmployee) {
        return res.status(200).json({
          data: groupByEmployee,
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
  getEthnicity = async (req, res) => {
    console.log('getEthnicity');
    try {
      const data = await EthnicityServices();
      if (data) {
        return res.status(200).json({
          data,
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
  getDeductable = async (req, res) => {
    try {
      const data = await DeductableServices();
      if (data) {
        return res.status(200).json({
          data,
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
  getBenefit = async (req, res) => {
    try {
      const data = await BenefitServices();
      if (data) {
        return res.status(200).json({
          data,
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
  addTotalEarning = async (req, res) => {
    const {
      Employee_Number,
      Employee_ID,
      Last_Name,
      First_Name,
      Pay_Rate,
      PayRates_id,
      Vacation_Days,
      Paid_To_Date,
      Paid_Last_Year,
      Gender,
      Shareholder_Status,
      Ethnicity,
      Employment_Status,
      Department,
      Benefit_Plans,
    } = req.body;
    if (
      !Employee_Number ||
      !Employee_ID ||
      !Last_Name ||
      !First_Name ||
      !Pay_Rate ||
      !PayRates_id ||
      !Vacation_Days ||
      !Paid_To_Date ||
      !Paid_Last_Year ||
      !Benefit_Plans
    ) {
      return res.status(500).json({
        message: 'Missing data',
      });
    }
    try {
      const data = await addTotalEarningSevicesMySql(
        Employee_Number,
        Employee_ID,
        Last_Name,
        First_Name,
        Pay_Rate,
        PayRates_id,
        Vacation_Days,
        Paid_To_Date,
        Paid_Last_Year
      );
      const datasqlServer = await addTotalEarningSevicesSqlSever(
        Employee_ID,
        Last_Name,
        First_Name,
        Gender,
        Shareholder_Status,
        Ethnicity,
        Employment_Status,
        Department,
        Benefit_Plans
      );
      if (datasqlServer && data) {
        return res.status(200).json({
          data,
          datasqlServer,
          code: 1,
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
