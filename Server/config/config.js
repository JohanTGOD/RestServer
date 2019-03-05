//Esto es para que coja el puerto por defecto de heroku
process.env.PORT= process.env.PORT || 3000;

//Esto es para ver si estoy en produccion o en desarrollo
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Base de datos

let urlDB

    if (process.env.NODE_ENV==='dev') {
        urlDB='mongodb://localhost:27017/cafe' 
    }else{
        //'mongodb+srv://root:xNVaI4GC8c7QI85U@johan-vsxti.mongodb.net/cafe'
        urlDB= process.env.MONGO_URI
    }
  


process.env.URLDB= urlDB;