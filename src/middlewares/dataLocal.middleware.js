const pool = require('../config/connectDatabase')
const dataLocal = async (req, res, next) => {
    const sql = `SELECT * FROM dmsanpham`
    const [rows] = await pool.query(sql)
    if (rows.length > 0) {
        res.locals.dataLocal = rows
        if (req.signedCookies.giohang) {
            let total = req.signedCookies.giohang.reduce((total, item) => {
                return total + item.quantity
            }, 0);
            res.locals.cartquatity = total;
            next()
            return
        }
    }
    next()
}



module.exports = { dataLocal };