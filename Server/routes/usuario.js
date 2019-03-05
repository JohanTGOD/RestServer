const express = require('express')
const app = express()
const bcript= require('bcrypt')
const Usuario= require('../models/usuario');
//Esta es una libreria muy grande de apoyo que funciona para dar mas propiedades a javascript node and mongo
const _=require('underscore');


app.get('/usuario', function (req, res) {
    // en el find puedo enviar parametros para filtrar la busqueda como un select con un where


    //para enviar los parametrso de un qrey se hacer asi:
    //localhost:3000/usuario?desde=3&limite=8
    let desde = req.query.desde || 0;
    desde= Number(desde);

    let limite = req.query.limite || 5;
    limite=Number(limite);

    //Esto significa traigame toda la informacion pero solo muestreme el email y el nombre
    //El estado = true es para que me valide el filtro por los usarios que estan con estado true
    // puedo poner el estado vacion pero me va a traer todo y no voy a saber cuales estan activos
    Usuario.find({estado: true},"nombre email")
           .limit(limite)
           .skip(desde)
           .exec((err,listaUsuarios)=>{
            if (err) {
              return   res.status(400).json({
     
                     ok:false,
                     err
                 })
             }
        Usuario.count({estado: true},(err,total)=>{
          res.json({
            ok: true,
            listaUsuarios,
            total: "Hay un total de : "+total+" usuarios"
          }) 

})

         

           })
  })
  
  
app.post('/usuario', function (req, res) {
      console.log("Entro a usuario");
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
        // yo puedo enviar los parametros de esta manera pero es muy tedioso
        //let body = req.body;

        //la manera correcta es
        //permite que desde el postman no se envie informacion como el role y password para np hacer cambios importantes en la base de datos
        let body= _.pick(req.body,['nombre','email','password','role','estado']);

        //New me permite que se vean los cambios en postman, run validatos coger las validaciones del esquema
        Usuario.findByIdAndUpdate(id,body,{new: true, runValidators: true},(err,usuariodb)=>{
          if (err) {
            return   res.status(400).json({
   
                   ok:false,
                   err
               })
           }

           res.json({
            ok:true,
            usuarsadas:usuariodb
        })

        })
  

      //res.json('put')
    })
  
  
 app.delete('/usuario/:id', function (req, res) {
      
    let id = req.params.id;


    //Esta linea de aca es para eliminar completamente el usuario
    //Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{


    //Esta linea es para cambiar simplemente el estado a false , para simular una eliminacion
    //EL findByIdAndUpdate necesita un objeto, se lo enviamos quemado igual a fasle
    Usuario.findByIdAndUpdate(id,{estado : false},{new: true},(err,usuarioBorrado)=>{
      if (err) {
        return   res.status(400).json({

               ok:false,
               err
           })
       }

       if (!usuarioBorrado) {
        return   res.status(400).json({

          ok:false,
          err:{
              message: "No existe ese usuario para eliminar"
          }
        })
       }

       res.json({
        ok: true,
        usuarioBorrado

       })

    })

    })


    module.exports=app