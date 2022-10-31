const mongoose=require('mongoose');

const blood=new mongoose.Schema({
    hemoglobin:{
        type:String
    },
    platelet:{
        type:String
    },
    rhFactor:{
        type:String
    },
    antibodies:
    {
        type:String
    }

})

module.exports=mongoose.model('Blood',blood);