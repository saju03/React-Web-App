const  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/reactWebApp',{useNewUrlParser:true})


mongoose.connection.once('open',()=>console.log('database connection success')).on('error',error=>{
    console.log(error);
})

