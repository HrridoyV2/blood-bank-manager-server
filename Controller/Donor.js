const Donor = require('../Models/DonorModel');

const ErrorHandler= require('../Utlis/ErrorHandler');
const asyncError = require('../Middleware/asyncError');
const sendToken = require('../Utlis/jwtToken')

exports.register = asyncError(async(req, res, next)=>{
    
    // const {name,email,phone,password}=req.body;

    const donor = await Donor.create(req.body)
    sendToken(donor,200,res)
});

exports.login = asyncError(async(req, res, next)=>{
    const{email,password}=req.body;
   
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password',400))
    }
    //finding user 
    const donor = await Donor.findOne({email}).select('+password')//we select password because we set password select false in usermodel
    if(!donor){
        return next(new ErrorHandler('Invalid Password',401));

    }
    //checks if password is correct or not

    const ifPasswordCorrect = await donor.comparePassword(password);
    if(!ifPasswordCorrect){
        return next(new ErrorHandler('Invalid Password',401));
    }
    sendToken(donor,200,res)
    // const token=findUser.getJwtToken();
    // res.status(200).json({
    //     success: true,
    //     token
    // });
})


//get current logged in user details
exports.getDonorProfile= asyncError(async(req, res, next)=>{

    const donor= await Donor.findById(req.user.id)
    res.status(200).json({
        success:true,
        donor

    })
})


//update user profile =>/api/v1/me/update
exports.updateDonorProfile = asyncError(async(req, res, next)=>{
    // const newDonorData=req.body
    // //update avatar: TODO
   
    let donor = await Donor.findByIdAndUpdate(req.donor.id,req.body)
    donor =await Donor.findById(req.donor.id)
    res.status(200).json({
        success: true,
        donor
    })
})

//logout user=>/api/v1/logout
exports.logout= asyncError(async(req, res, next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
})

//admin routes
//get all users => /api/v1/admin/users
exports.allDonors = asyncError(async(req, res, next)=>{
    const donors = await Donor.find({role:'donor'});
    // console.log(donors)
    res.status(200).json({
        success: true,
        donors
    })
})
//get user details => /api/v1/user/:id
exports.getDonorDetails = asyncError(async(req, res, next)=>{
    const donor=await Donor.findById(req.params.id);
    if(!donor){
        return next(new ErrorHandler(`donor not found with id:${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        donor
    })
})
exports.donorByCityAndBlood = asyncError(async(req, res, next)=>{
    const donor=await Donor.find({city:req.body.city,bloodGroup:req.body.bloodGroup});
    if(!donor){
        return next(new ErrorHandler(`donor not found with id:${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        donor
    })
})

//update user details => /api/v1/adim/user/:id
exports.updateDonorProfileById = asyncError(async(req, res, next)=>{
    const newDonorData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    //update avatar: TODO

    const donor = await Donor.findByIdAndUpdate(req.params.id,newDonorData,{
        new:true,
        runValidators: true,
        usefindAndModify: false
    })
    res.status(200).json({
        success: true,
        donor
    })
})
exports.verifyDonor = asyncError(async(req, res, next)=>{
    const donor = await Donor.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators: true,
        usefindAndModify: false
    })
    res.status(200).json({
        success: true,
        donor
    })
})
//delete user => /api/v1/user/:id
exports.deleteDonor = asyncError(async(req, res, next)=>{
    const donor=await Donor.findById(req.params.id);
    if(!donor){
        return next(new ErrorHandler(`Donor not found with id`))
    }
    // remove avater
    await donor.remove();
    res.status(200).json({
        success: true,
        
    })
})
