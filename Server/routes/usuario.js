const express = require('express')
const app = express()
const bcript= require('bcrypt')
const Usuario= require('../models/usuario');


app.get('/usuario', function (req, res) {
    res.json('get')
  })
  
  
app.post('/usuario', function (req, res) {
  
      let body = req.body;

      let usuario = new Usuario({

        nombre:body.nombre,
        email:body.email,
        //encripta la contraseña en un solo hash, no se puede desencriptar
        password:bcript.hashSync(body.password,10),
        role:body.role

      });
  
      usuario.save((err,usuariodb)=>{
        if (err) {
         return   res.status(400).json({

                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            usuario:usuariodb  
        })
      })
  
    //   if (body.nombre === undefined) {
    //         res.status(400).json({
  
    //           ok:false,
    //           mensaje:"El nombre es un caracter obligatorio"
    //         })   
    //   }else{
  
    //       res.json({
    //           body
    //       })
    //   }
     
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


    module.exports=app