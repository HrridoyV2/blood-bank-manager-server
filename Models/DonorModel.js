const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const crypto = require('crypto')

const donorSchema=new mongoose.Schema({
 name:{
     type:String,
     required:[true,'Please enter your name'],  
 },
 email:{
     type:String,
     required:[true,'Please enter your email'],
 },
 password:{
     type:String,
     required:[true,'Please enter your password'],
     minlength:[6, 'your password should be atleast 6 character'],
     select:false
 },
 phone:{
    type:String,
    required:false
 },
 
 role:{
    type:String,
    default:'donor'
 },
 createdAt:{
     type:Date,
     default: Date.now
 },
 resetPsswordToken:String,
 resetPsswordExpire:Date

})

// Encrypting password before save
donorSchema.pre('save',async function(next){// here can't use arrow functions
    if(!this.isModified('password')){
        next();
    }// this if block check if the password is modified or not if not it doesn't encrypt again
    this.password=await bcrypt.hash(this.password,10);
})
//compare password
donorSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
//Return JWT Token

donorSchema.methods.getJwtToken=function(){
      return jwt.sign({id:this._id},process.env.JWT_SECRET,{
          expiresIn:process.env.JWT_EXPIRES_TIME
      })  
}
// Generate password reset token
donorSchema.methods.getResetPasswordToken=function(){
    //Generate token
    const resetToken=crypto.randomBytes(20).toString('hex');
    // hash and reset token
    this.resetPsswordToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    //set token expire time
    this.resetPsswordExpire=Date.now()+30*60*1000;

    return resetToken;
}
module.exports=mongoose.model('donor',donorSchema)