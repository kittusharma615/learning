const express = require('express');
const multer=require('multer');
const { createUser, verifyOtp, LoginUser,DeleteUser } = require('../controller/userController')
const {getAllActiveUserData,createAdminUser,adminLogin,adminVerifyOtp} = require('../controller/Admin')
const {Valider} = require('../middleware/userAuth');
const {UserAuthenticate,UserAuthorize} = require('../middleware/UserAuthToken');
const {AdminAuthenticate,AdminAuthorize} = require('../middleware/AdminAuthToken')

const route = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage})

//User Api
route.post('/createUser',upload.single('profileImg'),Valider ,createUser)
route.post('/verify-otp/:id' ,verifyOtp)
route.post('/LoginUser' ,LoginUser)
route.delete('/DeleteUser/:id' ,UserAuthenticate,UserAuthorize,DeleteUser)


//Admin APi
route.get('/getAllActiveUserData/:type' ,AdminAuthenticate,getAllActiveUserData)
route.post('/createAdminUser',upload.single('profileImg') ,createAdminUser)
route.post('/adminVerifyOtp/:id',adminVerifyOtp)
route.post('/adminLogin',adminLogin)

// Create first admin login then get all data using admin key

module.exports = route;  