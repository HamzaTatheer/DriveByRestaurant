const multer = require("multer");

module.exports = function (path){
    
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path)
        },
        filename: function (req, file, cb) {
          let ext = ''; // set default extension (if any)
          if (file.originalname.split(".").length>1) // checking if there is an extension or not.
              ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
          cb(null, file.fieldname + Date.now() + ext)
        }
    })

    return multer({ storage: storage });
}