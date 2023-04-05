const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,'enter email id']
    },
    password:{
        type:String,
        required:[true,'enter password']
    }
})

adminSchema.pre('save',async function(next){
    //usig norm fun to access this k wrd
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next();
})

adminSchema.statics.login = async function(email,password){
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

module.exports = mongoose.model('Admin',adminSchema)