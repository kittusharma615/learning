const express = require('express');
const multer=require('multer');
const { createUser } = require('../controller/userController')
const {Valider} = require('../middleware/userAuth');

const route = express.Router();


const storage = multer.memoryStorage();
const upload = multer({storage})

route.post('/createUser',upload.single('profileImg'),Valider ,createUser)



module.exports = route; 