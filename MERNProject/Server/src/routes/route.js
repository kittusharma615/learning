const express = require('express');
const multer=require('multer');
const { createUser, verifyOtp, LoginUser,DeleteUser,resenUserOtp ,updateProfile,
    changePassword,newEmail,verifynewEmailOtp} = require('../controller/userController')
const {getAllActiveUserData,createAdminUser,adminLogin,adminVerifyOtp} = require('../controller/Admin')
const {Valider} = require('../middleware/userAuth');
const {UserAuthenticate,UserAuthorize} = require('../middleware/UserAuthToken');
const {AdminAuthenticate} = require('../middleware/AdminAuthToken')

const route = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage})

//User Api
route.post('/createUser',upload.single('profileImg'),Valider ,createUser)
route.post('/verify-otp/:id' ,verifyOtp)
route.get('/resendUserOtp/:id' ,resenUserOtp)
route.post('/LoginUser' ,LoginUser)
route.delete('/DeleteUser/:id' ,UserAuthenticate,UserAuthorize,DeleteUser)
route.put('/updateProfile/:id' ,upload.single('profileImg'),UserAuthenticate,UserAuthorize,updateProfile)
route.put('/changePassword/:id',UserAuthenticate,UserAuthorize,changePassword)
route.put('/newEmail/:id',UserAuthenticate,UserAuthorize,newEmail)
route.post('/verifynewEmailOtp/:id' ,verifynewEmailOtp)



//Admin APi
route.get('/getAllActiveUserData/:type' ,AdminAuthenticate,getAllActiveUserData)
route.post('/createAdminUser',upload.single('profileImg') ,createAdminUser)
route.post('/adminVerifyOtp/:id',adminVerifyOtp)
route.post('/adminLogin',adminLogin)

// Create first admin login then get all data using admin key

module.exports = route;   