const multer = require('multer')
const upload = multer({
    dest: 'src/public/uploads/', filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})





const uploadFile = upload.single('avatar')


module.exports = { uploadFile };