const multer = require ("multer");
const path = require("path");

//Array con los tipos de archivos válidos que se puedan guardar
const VALID_FILE_TYPES = ['image/png', 'image/jpg','image/jpeg'];

const fileFilter = (req, file, cb) => {
    if(!VALID_FILE_TYPES.includes(file.mimetype)) {
        cb (createErro("El tipo de archivo no es válido"))
    } else {
        cb (null, true);
    }
};  

//Almacén donde se guardan los archivos

const storage = multer.diskStorage({
    fulename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads'));
    }
});

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload; 