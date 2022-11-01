const express=require('express'); 

const router=express.Router();

const { register,login,logout,forgotPassword,changePassword,getDonorProfile, updateDonorProfile, allDonors, getDonorDetails, updateDonorProfileById, deleteDonor, verifyDonor, donorByCityAndBlood, requestBlood } = require('../Controller/Donor');

const { isAuthenticatedDonor,authorizedRule }=require('../Middleware/checkAuth')

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout)
router.route('/me').get(isAuthenticatedDonor ,getDonorProfile)
router.route('/me/update').put(isAuthenticatedDonor, updateDonorProfile)
router.route('/blood-request/:id').put(requestBlood)
router.route('/donors').get(allDonors)
router.route('/donors-by-city-and-blood-group/:bloodGroup/:city').get(donorByCityAndBlood)
router.route('/admin/donors').get(isAuthenticatedDonor,authorizedRule('admin'),allDonors)
router.route('/admin/verify-donor/:id').put(isAuthenticatedDonor,authorizedRule('admin'),verifyDonor)
router.route('/admin/donor/:id')
                                .get(isAuthenticatedDonor,authorizedRule('admin'),getDonorDetails)
                                .put(isAuthenticatedDonor,authorizedRule('admin'),updateDonorProfileById)
                                .delete(authorizedRule('admin'),deleteDonor)
module.exports = router;