const BloodBank = require('../Models/bloodBank');

const ErrorHandler= require('../Utlis/ErrorHandler');
const asyncError = require('../Middleware/asyncError');
const sendToken = require('../Utlis/jwtToken')

exports.createBloodBank = asyncError(async(req, res, next)=>{
    
    // const {name,email,phone,password}=req.body;

    const blood = await BloodBank.create(req.body)
    // sendToken(blood,200,res)
    res.status(200).json({
            success: true,
            blood
        });
});
exports.getBloodBank = asyncError(async(req, res, next)=>{
    
    // const {name,email,phone,password}=req.body;

    const blood = await BloodBank.findById(req.params.id)
    // sendToken(blood,200,res)
    res.status(200).json({
        success: true,
        blood
    })
});
exports.getALLBloodBank = asyncError(async(req, res, next)=>{
    
    // const {name,email,phone,password}=req.body;

    const blood = await BloodBank.find({})
    // sendToken(blood,200,res)
    res.status(200).json({
        success: true,
        blood
    })
});
exports.requestedBlood = asyncError(async(req, res, next)=>{
    
    // const {name,email,phone,password}=req.body;

    const blood = await BloodBank.findByIdAndUpdate(req.params.id, req.body)
    // sendToken(donor,200,res)
    res.status(200).json({
        success: true,
        blood
    })
    
});



