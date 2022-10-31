const mongoose = require('mongoose');

const bloodBank = new mongoose.Schema({

    
    hospital: {
        type: String,

    },
    bloods:
        [
            {
            group: {
                type: String
            },
            amount:{
                type:String
            },
            expireDate:{
                type:Date,
                
            },
            collectedAt:{
                type:Date,
                
            },
        }
        ],
    requestedBlood:[
        {
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
        }
    ],

})

module.exports = mongoose.model('BloodBank', bloodBank);