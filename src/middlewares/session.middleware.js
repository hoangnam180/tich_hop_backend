const arrSp = []
const Session = (req, res, next) => {
    if (!req.signedCookies.giohang) {
        res.cookie('giohang', arrSp, {
            signed: true,
        });
    }
    next()
}



module.exports = { Session };