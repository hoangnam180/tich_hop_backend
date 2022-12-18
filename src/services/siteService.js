const { conn, pool } = require('../config/connectDatabase');
const { concat } = require('lodash');
const payrollemployeesSevices = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = 'SELECT * FROM `employee`';
      const [employee] = await pool.execute(sql);
      if (employee) {
        resolve(employee);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const benefitPlanSevices = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `select * from Benefit_Plans`;
      const benefitPlans = await conn.query(sql);
      if (benefitPlans?.recordset) {
        resolve(benefitPlans?.recordset);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const payRateIdSevices = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT pay_rates.Pay_Rate_Name,pay_rates.idPay_Rates FROM pay_rates`;
      const [pay_ratesId] = await pool.execute(sql);
      if (pay_ratesId) {
        resolve(pay_ratesId);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const PersonalSqlSeverServices = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sqlSeverEmployment = `select jh.Department, p.Employee_ID,p.Phone_Number, p.First_Name, p.Last_Name, p.Address1, p.Address2,p.Email,
    p.Gender,p.Shareholder_Status, p.Ethnicity, b.Deductable,b.Plan_Name ,e.Employment_Status
    from Personal p inner join Job_History jh on p.Employee_ID = jh.Employee_ID
    inner join Employment e on p.Employee_ID = e.Employee_ID 
    inner join Benefit_Plans b on p.Benefit_Plans = b.Benefit_Plan_ID`;
      const employments = await conn.query(sqlSeverEmployment);
      if (employments?.recordset) {
        resolve(employments?.recordset);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
const jobHistorySevices = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `select Department,Start_Date,End_Date,Job_Title,Location,Hours_per_Week from Job_History`;
      const jobHistory = await conn.query(sql);
      if (jobHistory?.recordset) {
        resolve(jobHistory?.recordset);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const EthnicityServices = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `select Personal.Ethnicity from Personal`;
      const personal = await conn.query(sql);
      if (personal?.recordset) {
        resolve(personal?.recordset);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const DeductableServices = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `select Benefit_Plans.Deductable from Benefit_Plans`;
      const Deductable = await conn.query(sql);
      if (Deductable?.recordset) {
        resolve(Deductable?.recordset);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
const BenefitServices = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `select Benefit_Plans.Benefit_Plan_ID from Benefit_Plans`;
      const Benefit = await conn.query(sql);
      if (Benefit?.recordset) {
        resolve(Benefit?.recordset);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const totalEarningSevices = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const sqlSeverEmployment = `select jh.Department, p.Employee_ID, p.First_Name, p.Last_Name, 
    p.Gender, p.Ethnicity, b.Deductable, e.Employment_Status
    from Personal p inner join Job_History jh on p.Employee_ID = jh.Employee_ID
    inner join Employment e on p.Employee_ID = e.Employee_ID 
    inner join Benefit_Plans b on p.Benefit_Plans = b.Benefit_Plan_ID`;

    const mysqlEmployee = `SELECT e.idEmployee AS Employee_ID, e.First_Name, e.Last_Name, e.Employee_Number, e.Vacation_Days, p.*, e.Paid_To_Date, e.Paid_Last_Year
    from employee e inner join pay_rates p on p.IdPay_Rates = e.PayRates_id
        `;
    let groupByEmployee = {};
    try {
      const employments = await conn.query(sqlSeverEmployment);

      const [employees] = await pool.execute(mysqlEmployee);

      const data = concat(employees, employments.recordset);
      const dataConvert = data?.map((item) => {
        return {
          Employee_ID: item?.Employee_ID,
          value: { ...item },
        };
      });
      var output = dataConvert.reduce(function (o, cur) {
        var occurs = o.reduce(function (n, item, i) {
          return item.Employee_ID === cur.Employee_ID ? i : n;
        }, -1);
        if (occurs >= 0) {
          o[occurs].value = o[occurs].value.concat(cur.value);
        } else {
          var obj = {
            Employee_ID: cur.Employee_ID,
            value: [cur.value],
          };
          o = o.concat([obj]);
        }
        return o;
      }, []);

      const result = output?.map((item) => {
        const newValue = { ...item?.value?.[0], ...item?.value?.[1] };
        return newValue;
      });
      if (data && result) {
        resolve({
          data,
          groupByEmployee: result,
        });
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
const addTotalEarningSevicesMySql = async (
  Employee_Number,
  Employee_ID,
  Last_Name,
  First_Name,
  Pay_Rate,
  PayRates_id,
  Vacation_Days,
  Paid_To_Date,
  Paid_Last_Year
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `INSERT INTO employee(Employee_Number, idEmployee, Last_Name, First_Name,Pay_Rate, PayRates_id, Vacation_Days, Paid_To_Date, Paid_Last_Year) VALUES (${Employee_Number},${Employee_ID},'${Last_Name}','${First_Name}',${Pay_Rate},${PayRates_id},${Vacation_Days},${Paid_To_Date},${Paid_Last_Year})`;
      const addTotalEarning = await pool.execute(sql);
      if (addTotalEarning) {
        resolve(addTotalEarning);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
const addTotalEarningSevicesSqlSever = async (
  Employee_ID,
  Last_Name,
  First_Name,
  Gender,
  Shareholder_Status,
  Ethnicity,
  Employment_Status,
  Department,
  Benefit_Plans
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql1 = `insert into Personal (Employee_ID, First_Name,Last_Name, Gender, Shareholder_Status, Benefit_Plans, Ethnicity) values ('${Employee_ID}',N'${First_Name}',N'${Last_Name}','${Gender}','${Shareholder_Status}',${Benefit_Plans},'${Ethnicity}')`;
      const addTotalEarning = await conn.query(sql1);
      const sql2 = `insert into Employment (Employee_ID, Employment_Status) values ('${Employee_ID}',N'${Employment_Status}')`;
      const addTotalEarning2 = await conn.query(sql2);
      const sql3 = `insert into Job_History (Employee_ID, Department) values ('${Employee_ID}',N'${Department}')`;
      const addTotalEarning3 = await conn.query(sql3);
      console.log(addTotalEarning);
      console.log(addTotalEarning2);
      console.log(addTotalEarning3);

      if (addTotalEarning && addTotalEarning2 && addTotalEarning3) {
        resolve(addTotalEarning);
      } else {
        resolve(false);
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};
module.exports = {
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
};
