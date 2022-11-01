const express=require('express'); 
const { createBloodBank, getALLBloodBank, requestedBlood } = require('../Controller/bloodBank');

const router=express.Router();
const { isAuthenticatedDonor,authorizedRule }=require('../Middleware/checkAuth')
router.route('/create-blood-bank').post(createBloodBank).get(isAuthenticatedDonor,authorizedRule('admin'),createBloodBank)
router.route('/blood-bank').get(getALLBloodBank)
router.route('/request-blood/:id').put(requestedBlood)
                            
module.exports = router;