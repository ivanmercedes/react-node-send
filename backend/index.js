const express = require('express');

// crear el servivor
const app = express();

console.log('Comenzando Node Send');

// Puerto de la app
const port = process.env. PORT || 4000;

app.listen(port, '0.0.0.0', ()=>{
    console.log(`Servidor funcionando en el puerto ${port}`);
})

