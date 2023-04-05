const adminModel = require("../Models/adminModel")
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

module.exports.editProfile = (req,res,next)=>{

    
    const token = req.cookies.jwt;
    
    if(token){
         jwt.verify(token,'123asd',
         async (err,decodedToken)=>{
            if(err){

            }
            else{
                const user = await userModel.findById(decodedToken.id);
                if (user){
                userModel.findByIdAndUpdate(decodedToken.id,{profileImg:req.files[0].filename}).then((result)=>{
                        if(result){
                          
                                res.status(200)
                                res.json({profileImg:req.files[0].filename,status:true})
                         
                        }
                    })
                }
            }
         })
    }
}

module.exports.Adminlogin = async (req,res,next)=>{



    try {
        const {email,password } = req.body
        const admin = await adminModel.login(email,password)
        const token = createToken(admin._id)
   
          res.cookie('adminjwt',token,{
            withCrdentials:true,
            httpOnly:false,
            maxAge:maxAge*1000         
        });
       
        res.status(201).json({admin:admin._id,created:true,adminjwt:token})
        

       
    } catch (error) {
        console.log(error);
        const errors = handelErrors(error)
        res.json({errors,created:false})
    }


    
}

module.exports.getUserDatas = async( req,res,next)=>{
// jwt verification pending 
const data = await userModel.find();
if(data){
    
    res.json({data,status:true})
}

}

module.exports.updateUser = async (req,res,next)=>{
    // jwt verification pending 
  const {name,email,id} = req.body;

    let data = await userModel.findByIdAndUpdate(id,{name:name,email:email})

   if(data){
    res.json({status:true})
   }
   
}
module.exports.deleteUser = async (req,res,next)=>{
    // jwt verification pending 
  const {id} = req.body;

    let data = await userModel.findByIdAndDelete(id)

   if(data){
    res.json({status:true})
   }
   
}