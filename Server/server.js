require('./config/config');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// De esta manera importo y uso las rutas del usuarios como inicializar un drive rque ya tengo
app.use(require('./routes/usuario'));



  mongoose.connect(process.env.URLDB,{ useNewUrlParser: true })
    .then(()=>{
        console.log("Connected to mongo database");
    })
    .catch((err)=>{
        console.log("Error connecting mongo database",err);
    });


app.listen(process.env.PORT,()=>{

console.log("Escuchando puerto: ",process.env.PORT)
})