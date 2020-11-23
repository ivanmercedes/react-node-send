const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');


exports.subirArchivo = async (req,res, next) =>{
    
    const configuracionMulter = {
        limits: { fileSize: req.usuario ? 1024 * 1024 * 20 : 1025 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) =>{
                cb(null,__dirname+'/../upload')
            },
            filename: (req, file, cb) =>{
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'),file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`);
            },
    
    
        })
    }
    const upload = multer(configuracionMulter).single('archivo');

    upload(req, res, async(error)=>{
        console.log(req.file);

        if(!error){
            res.json({archivo: req.file.filename});
        }else{
            console.log(error);
            return next();
        }
    })
   

}

exports.eliminarArchivo = async (req, res) =>{
    
    try {
        fs.unlinkSync(__dirname + `/../upload/${req.archivo}`);
        console.log('archivo eliminado');
    } catch (error) {
        console.log(error);
    }
}