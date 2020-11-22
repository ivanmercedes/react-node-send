const express = require('express');
const conectarDB = require('./config/db');

// crear el servivor
const app = express();



// Conectar a la base de datos
conectarDB();

// Puerto de la app
const port = process.env. PORT || 4000;

// Habiliatar leer los valores de un body
app.use( express.json());

// Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));

app.listen(port, '0.0.0.0', ()=>{
    console.log(`Servidor funcionando en el puerto ${port}`);
})

