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
const PersonalSqlSeverServices = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sqlSeverEmployment = `select jh.Department, p.Employee_ID, p.First_Name, p.Last_Name, p.Address1, p.Address2,p.Email,
    p.Gender, p.Ethnicity, b.Deductable,b.Plan_Name ,e.Employment_Status
    from Personal p inner join Job_History jh on p.Employee_ID = jh.Employee_ID
    inner join Employment e on p.Employee_ID = e.Employee_ID 
    inner join Benefit_Plans b on p.Benefit_Plans = b.Benefit_Plan_ID`;
      const employments = await conn.query(sqlSeverEmployment);
      console.log('test', employments);
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
const totalEarningSevices = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const sqlSeverEmployment = `select jh.Department, p.Employee_ID, p.First_Name, p.Last_Name, p.Address1, p.Address2,p.Email,
    p.Gender, p.Ethnicity, b.Deductable,b.Plan_Name ,e.Employment_Status
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
      forEach(data, (el, index) => {
        if (groupByEmployee[get(el, 'Employee_ID')]) {
          groupByEmployee[get(el, 'Employee_ID')] = {
            ...groupByEmployee[get(el, 'Employee_ID')],
            ...el,
          };
        } else {
          groupByEmployee[get(el, 'Employee_ID')] = {};
          groupByEmployee[get(el, 'Employee_ID')] = {
            ...groupByEmployee[get(el, 'Employee_ID')],
            ...el,
          };
        }
      });
      if (data && groupByEmployee) {
        resolve({
          data,
          groupByEmployee,
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
};
