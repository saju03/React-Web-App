const User = require('../Models/userModel')
const Admin = require('../Models/adminModel')
const jwt = require('jsonwebtoken')


module.exports.checkUser = (req,res,next)=>{

    
    const token = req.cookies.jwt;
    
    if(token){
         jwt.verify(token,'123asd',
         async (err,decodedToken)=>{
            if(err){
                res.json({status:false})
                next();
            }else{
                const user = await User.findById(decodedToken.id);
                if(user){
                    res.json({status:true,user:user.name,email:user.email,profileImg:user.profileImg})
                }else{
                    res.json({status:false})
                    next();
                }
            }
         })
    }else{
        res.json({status:false})
        next();
    }
}

module.exports.checkAdmin = (req,res,next)=>{

    
    const token = req.cookies.adminjwt;
    
    if(token){
         jwt.verify(token,'123asd',
         async (err,decodedToken)=>{
            if(err){
                res.json({status:false})
                next();
            }else{
                const admin = await Admin.findById(decodedToken.id);
                if(admin){
                    res.json({status:true,email:admin.email})
                    next();
                }else{
                    res.json({status:false})
                    next();
                }
            }
         })
    }else{
        res.json({status:false})
        next();
    }
}