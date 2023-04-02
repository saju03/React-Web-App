const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        

    },
    email:{
        type:String,
        // unique:true,
        required:[true,'email is required']
        
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
})
userSchema.pre('save',async function(next){
    //usig norm fun to access this k wrd
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next();
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect Email')
}

module.exports = mongoose.model('User',userSchema)