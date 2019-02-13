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

  mongoose.connect('mongodb://localhost:27017/cafe',(err,res)=>{
  if (err) {
      throw new err;
  }else{

    console.log("base de datos conectadada");
  }

  });


app.listen(process.env.PORT)