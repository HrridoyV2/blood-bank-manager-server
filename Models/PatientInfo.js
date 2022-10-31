const mongoose=require('mongoose');

const patientSchema=new mongoose.Schema({
    donorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Donor
    },
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
    
     recuiredBloodGroup:{
        type:String,
    
     },
     donatedDate:{
        type:Date,
        default: Date.now
    },
})

module.exports=mongoose.model('PatientInfo',patientSchema);