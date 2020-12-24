const Enlaces = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.nuevoEnlace = async (req, res, next) =>{
    // revisar si hay errores
     // mostrar mensajes de error de express validator
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({ errores: errores.array() });
     }

    // Crear un objecto de Enlace
    const { nombre_original, nombre } = req.body;

    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;
    

    // Si el usuario esta autenticado
    if(req.usuario){
        const { password, descargas } = req.body;
        // asignar a enlace el numero de descargas
        if(descargas){
            enlace.descargas = descargas;
        }
        //asignar un password
        if(password){
            const salt = await bcrypt.genSalt(10);
            enlace.password = await bcrypt.hash(password, salt);
        }

        //asignar el autor
        enlace.autor = req.usuario.id;
    }

    // almacenar en la BD
    try {
        await enlace.save();
        return res.json({msg: `${enlace.url}`});
        next();
    } catch (error) {
        console.log(error);
    }
}

//Obtiene un listado de todos los enlaces
exports.todosEnlaces = async (req, res) =>{
    try {
        const enlaces = await Enlaces.find({}).select('url -_id');
        res.json({enlaces});
    } catch (error) {
        console.log(error);
    }
}

// retorna si el enlace tiene password o no
exports.tienePassword = async (req, res, next) =>{
    const { url } = req.params;

    // Verificar si existe el enlace
    const enlace = await Enlaces.findOne({url});

    if(!enlace){
        res.status(404).json({msg: 'Ese enlace no existe'});
        return next();
    }
    
    if(enlace.password){
        return res.json({ password: true, enlace: enlace.url });
    }
    next();
}
// Verifica si el password  es correcto
exports.verificarPassword = async (req, res, next) =>{

    const { url } = req.params;
    const { password } = req.body;

    // Consultar por el enlace
    const enlace =  await Enlaces.findOne({url});

    // Verificar el password
    if(bcrypt.compareSync(password, enlace.password)){
        // Permitir descargar el archivo
        next();
    }else{
        return res.status(401).json({msg: 'Password Incorrecto'});
    }

   
}
// Obtener el enlace
exports.obtenerEnlace = async (req, res, next) =>{
    // console.log(req.params.url);
    const { url } = req.params;

    // Verificar si existe el enlace
    const enlace = await Enlaces.findOne({url});

    if(!enlace){
        res.status(404).json({msg: 'Ese enlace no existe'});
        return next();
    }
    
    // si el enlace existe
    res.json({archivo: enlace.nombre, password: false});
    
    next();   
}