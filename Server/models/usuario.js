const mongoose = require('mongoose');
//Esto es para que los mensajes se entiendan
const uniqueValidator= require('mongoose-unique-validator');


//Esto se utiliza para decir que roles se pueden utilziar
let rolesValidos = {

    values:["ADMIN_ROLE","USER_ROLE"],
    message:'{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({

    nombre:{
        type:String,
        required:[true,"El nombre es necesario"]

    },
    email:{
        type:String,
        required:[true,"El correo es necesario"],
        unique:true

    },
    password:{
        type:String,
        required:[true,"La contraseña es requerida"]

    },
    img:{
        type:String,
        required:false

    },//no es obligatoria
    role:{
        type:String,
        default:'USER_ROLE',
        enum:rolesValidos
    },//default: 'User_role'
    estado:{
        type:Boolean,
        default:true
    },//boolean
    google:{
        type:Boolean,
        default:false

    }//boolean

})

usuarioSchema.plugin(uniqueValidator,{
    message:'{PATH} debe de ser unico'
})
module.exports=mongoose.model('Usuario',usuarioSchema);