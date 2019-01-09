require('./config/config');
const express = require('express')
const app = express()
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.get('/usuario', function (req, res) {
  res.json('get')
})


app.post('/usuario', function (req, res) {

    let body = req.body;


    if (body.nombre === undefined) {
          res.status(400).json({

            ok:false,
            mensaje:"El nombre es un caracter obligatorio"
          })   
    }else{

        res.json({
            body
        })
    }
   
  })


  app.put('/usuario/:idJohan', function (req, res) {
      let id = req.params.idJohan

      res.json({
          id
      })
    res.json('put')
  })


  app.delete('/usuario', function (req, res) {
    res.json('delete')
  })
 
app.listen(process.env.PORT)