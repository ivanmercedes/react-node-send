const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servivor
const app = express();



// Conectar a la base de datos
conectarDB();

//Habilitar cors
console.log(`URL FRONTEND: ${process.env.FRONT_END_URL}`);
const opcionesCors = {
    origin: process.env.FRONT_END_URL
}
app.use(cors(opcionesCors));

// Puerto de la app
const port = process.env. PORT || 4000;

// Habiliatar leer los valores de un body
app.use( express.json());


// Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

app.listen(port, '0.0.0.0', ()=>{
    console.log(`Servidor funcionando en el puerto ${port}`);
})

