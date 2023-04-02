const userModel = require("../Models/userModel")
const jwt = require('jsonwebtoken')
const maxAge = 60*60
const createToken = (id)=>{

    return jwt.sign({id},'123asd',{
        expiresIn:maxAge,
    })
}

const handelErrors = (err) =>{

    let errors = {email:"",password:''}
    if(err.code===11000){
        errors.email = 'email is already regestered Do Login'
    }
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    if(err.message=='incorrect password'){
        errors.password = 'incorrect password'

    }
    if(err.message=='incorrect Email'){
        errors.password = 'incorrect Email'

    }
    return errors
}
module.exports.register = async (req,res,next)=>{
    try {
        const {name,email,password } = req.body
        const user = await userModel.create({name,email,password})
        console.log(user);
        const token = createToken(user._id)

        res.cookie('jwt',token,{
            withCrdentials:true,
            httpOnly:false,
            maxAge:maxAge*1000         
        })
        
     
        res.status(201).json({user:user._id,created:true})
    } catch (error) {
        console.log(error);
        const errors = handelErrors(error)
        res.json({errors,created:false})
    }
}
module.exports.login = async (req,res,next)=>{

    try {
        const {email,password } = req.body
        const user = await userModel.login(email,password)
        const token = createToken(user._id)
   
          res.cookie('jwt',token,{
            withCrdentials:true,
            httpOnly:false,
            maxAge:maxAge*1000         
        });
       
        res.status(201).json({user:user._id,created:true,jwt:token})
        

       
    } catch (error) {
        console.log(error);
        const errors = handelErrors(error)
        res.json({errors,created:false})
    }
}