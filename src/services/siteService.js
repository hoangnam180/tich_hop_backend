const { conn, pool } = require('../config/connectDatabase');
const { concat, forEach, get } = require('lodash');
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
      const dataConvert = data?.map((item)=>{
        return {
          Employee_ID : item?.Employee_ID,
          value : 
            {...item}
          
        }
      })
      var output = dataConvert.reduce(function(o, cur) {
        var occurs = o.reduce(function(n, item, i) {
          return (item.Employee_ID === cur.Employee_ID) ? i : n;
        }, -1);
        if (occurs >= 0) {
          o[occurs].value = o[occurs].value.concat(cur.value);
        } else {
          var obj = {
            Employee_ID: cur.Employee_ID,
            value: [cur.value]
          };
          o = o.concat([obj]);
        }
        return o;
      }, []);
      
     const result = output?.map((item)=>{
      const newValue = {...item?.value?.[0],...item?.value?.[1]}
      return newValue
     })
      if (data && result) {
        resolve({
          data,
          groupByEmployee : result,
        });
      } else {
        resolve(false);
      }
    } catch (e) {
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
};
