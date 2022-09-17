const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,'Please enter your name'],  
    },
    phone:{
        type:String,
        required:true
     },
    address:{
        type:String,
     },
     gender:{
        type:String,
    
     },
     weight:{
        type:String,
    
     },
     bloodGroup:{
        type:String,
    
     },
     DOB:{
        type:Date,
     },

     lastDonatedAt:{
        type:Date,
        default: Date.now
    },
})

module.exports=mongoose.model('Product',productSchema);