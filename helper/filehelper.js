'use strict';
const multer = require('multer');
const path = require('path');
const rootDir = require('../utlisFunction/path');
const imageDir = path.join(rootDir, 'uploads', 'ImageDir');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        if(file.fieldname === 'imageurl'){
            cb(null, imageDir);
        }
        else{
            cb(new Error('Invalid field name'));
        }
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const filefilter = (req, file ,cb) =>{
    var ext = path.extname(file.originalname);
    if (ext === ".jpg" || ext === ".jpeg"|| ext === ".png" || ext === ".gif" || ext === ".webp") {
        cb(null, true);
    }
    else{
        cb(null, false);
    }

}
const upload = multer({ storage: storage, fileFilter: filefilter});

module.exports = { upload }