const userModel = require("../model/userModel");
const { UserImgURL } = require('../Image/ImageURL');
const { verifyUser } = require('../Mail/VerifyOtpUser')
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        const img = req.file;

        const { name, email, password } = data;

        const randomOtp = Math.floor(1000 + Math.random() * 9000)

        const checkUser = await userModel.findOne({ email: email })
        if (checkUser) {
            verifyUser(name, email, randomOtp)

        }
        if (img) {
            data.profileImg = await UserImgURL(img.buffer)
        }

        data.password = await bcrypt.hash(password, 10);

        verifyUser(name, email, randomOtp)
        const Db = await userModel.create(data)

        res.status(201).send({ status: true, msg: 'created User Data', data: Db })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}