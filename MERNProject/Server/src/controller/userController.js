const userModel = require("../model/userModel");
const { UserImgURL } = require('../Image/ImageURL');
const { verifyUser } = require('../Mail/VerifyOtpUser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        const img = req.file;

        const { name, email, password } = data;

        if (!data.verification) { data.verification = {} }
        if (!data.verification.email) { data.verification.email = {} }

        const randomOtp = Math.floor(1000 + Math.random() * 9000)

        const checkUser = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { 'verification.email.userOtp': randomOtp } }
        )
        if (checkUser) {
            const { isVerify, isDeleted } = checkUser.verification.email;
            if (isVerify) return res.status(400).send({ status: false, msg: 'Your Account Alredy Verify pls Login' })
            if (isDeleted) return res.status(400).send({ status: false, msg: 'Your Account is Deleted!' })
            verifyUser(name, email, randomOtp)
            return res.status(200).send({ status: true, msg: "Successully send Otp", data: { id: checkUser._id, profileImg: checkUser.profileImg, name: checkUser.name, email: checkUser.email } })
        }
        if (img) {
            data.profileImg = await UserImgURL(img.buffer)
        }

        data.password = await bcrypt.hash(password, 10);
        data.verification.email.userOtp = randomOtp
        data.role = 'user';

        verifyUser(name, email, randomOtp)
        const Db = await userModel.create(data)

        res.status(201).send({ status: true, msg: 'created User Data', data: { id: Db._id, profileImg: Db.profileImg, name: Db.name, email: Db.email } })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        const otp = req.body.otp;
        const id = req.params.id;

        if (!otp) res.status(400).send({ status: false, msg: 'pls provided otp' })

        const checkId = await userModel.findById(id)
        if (!checkId) res.status(404).send({ status: false, msg: 'User Not Found' })

        if (checkId) {
            if (checkId.verification.email.isVerify) return res.status(400).send({ status: false, msg: "Otp Already verify" })
        }

        const DBOtp = checkId.verification.email.userOtp

        if (!(otp == DBOtp)) return res.status(400).send({ status: false, msg: 'wrong Otp!' })

        await userModel.findByIdAndUpdate({ _id: id }, { $set: { 'verification.email.isVerify': true } })


        res.status(200).send({ status: true, msg: "Successfulyy otp Verify" })



    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

exports.LoginUser = async (req, res) => {
    try {
        const data = req.body;
        const { email, password } = data;

        const checkUser = await userModel.findOne({ email })
        if (!checkUser) return res.satus(400).send({ status: false, msg: 'user not found' })

        if (checkUser) {
            const { isVerify, isDeleted } = checkUser.verification.email
            if (!isVerify) return res.status(400).send({ status: false, msg: 'Please verify otp' })
            if (isDeleted) return res.status(400).send({ status: false, msg: 'Your Account is Deleted' })
        }

        const BcryptPassword = checkUser.password
        const checkPassword = bcrypt.compare(BcryptPassword, password)

        if (!checkPassword) return res.status(400).send({ status: false, msg: 'Wrong Password' })
        const token = jwt.sign({ id: checkUser._id }, process.env.UserToken, { expiresIn: '24h' })

        res.status(200).send({ status: true, msg: "Successfully Login", token })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

exports.DeleteUser = async (req, res) => {
    try {
    
        const userId = req.params.id;

        if(!userId) return res.status(400).send({status:false,msg:'Pls Provided Id'})

        const deleteuser = await userModel.findByIdAndUpdate({_id:userId},{$set:{'verification.email.isDeleted':true}},{new:true})
        console.log(deleteuser)

        res.status(200).send({status:true,msg:"successfully delete"})
        
    }
    catch (err){
        res.status(500).send({ status: false, msg: err.message })
    }
}