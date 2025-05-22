const userModel = require("../model/userModel");
const { UserImgURL, DeleteImage } = require('../Image/ImageURL');
const { verifyUser,changeEmail } = require('../Mail/VerifyOtpUser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { errorhandling } = require('../error/AllError')

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
  catch (err) { errorhandling(err, res) }

}

exports.verifyOtp = async (req, res) => {
  try {
    const otp = req.body.otp;
    const id = req.params.id;

    if (!otp) return res.status(400).send({ status: false, msg: 'pls provided otp' })

    const checkId = await userModel.findById(id)
    if (!checkId) return res.status(404).send({ status: false, msg: 'User Not Found' })

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

exports.resenUserOtp = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) res.status(400).send({ status: false, msg: 'pls provided id' })
    const randomOtp = Math.floor(1000 + Math.random() * 9000)

    const CheckUser = await userModel.findByIdAndUpdate(id, { $set: {} })

    const checkId = await userModel.findByIdAndUpdate(id,
      { $set: { 'verification.email.userOtp': randomOtp } },
      { new: true }//new mean get new DB data 
    )
    if (!checkId) res.status(404).send({ status: false, msg: 'User not found' })

    verifyUser(checkId.name, checkId.email, randomOtp)

    res.status(200).send({ status: true, msg: "Successfulyy resend Otp" })



  }
  catch (err) { errorhandling(err, res) }
}

exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await userModel.findOne({ email });
    if (!checkUser) return res.status(400).send({ status: false, msg: 'User not found' });


    const { isVerify, isDeleted } = checkUser.verification.email;
    if (!isVerify) return res.status(400).send({ status: false, msg: 'Please verify OTP' });

    if (isDeleted) return res.status(400).send({ status: false, msg: 'Your account is deleted' });


    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) return res.status(400).send({ status: false, msg: 'Wrong password' });


    const token = jwt.sign({ id: checkUser._id }, process.env.UserToken, { expiresIn: '24h' });

    res.status(200).send({
      status: true,
      msg: "Successfully Logged In",
      token,
      id: checkUser._id,
      data: {
        profileImg: checkUser.profileImg,
        name: checkUser.name,
        email: checkUser.email
      }
    });
  } catch (err) { errorhandling(err, res); }

}

exports.DeleteUser = async (req, res) => {
  try {

    const userId = req.params.id;

    if (!userId) return res.status(400).send({ status: false, msg: 'Pls Provided Id' })

    await userModel.findByIdAndUpdate({ _id: userId, role: 'user' }, { $set: { 'verification.email.isDeleted': true } }, { new: true })

    res.status(200).send({ status: true, msg: "successfully delete" })

  }
  catch (err) { errorhandling(err, res) }

}

exports.updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const img = req.file;

    if (!id) return res.status(400).send({ status: false, msg: 'id Required!' })

    const checkUser = await userModel.findById(id)
    if (checkUser) {
      const { isVerify, isDeleted } = checkUser.verification.email;
      if (!isVerify) return res.status(400).send({ status: false, msg: 'Your Account Not Verify pls Login' })
      if (isDeleted) return res.status(400).send({ status: false, msg: 'Your Account is Deleted!' })

      let profileImg = checkUser.profileImg;

      if (img && img.buffer) {
        if (profileImg?.asset_id) {
          await DeleteImage(checkUser.profileImg.asset_id);
        }
        const imgUrl = await UserImgURL(img.buffer)

        const data = await userModel.findByIdAndUpdate(id, { $set: { profileImg: imgUrl } }, { new: true })

        res.status(200).send({ status: true, msg: "Updated Image", data: { profileImg: data.profileImg } })
      }
    }

  }
  catch (err) {
    errorhandling(err, res)
  }
}

exports.changePassword = async (req, res) => {
  try {
    const { current_password, new_password, confirm_password } = req.body;
    const userId = req.params.id;

    if (!current_password || !new_password || !confirm_password) {
      return res.status(400).send({ status: false, msg: 'All password fields are required' });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).send({ status: false, msg: 'User not found' });

    const BcryptPassword = user.password
    const checkPassword = await bcrypt.compare(current_password, BcryptPassword);

    if (!checkPassword) return res.status(400).send({ status: false, msg: 'Wrong Current Password' });


    if (new_password !== confirm_password) {
      return res.status(400).send({ status: false, msg: 'Password did not match' });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    const DB = await userModel.findByIdAndUpdate(userId, { $set: { password: hashedPassword } }, { new: true });

    res.status(200).send({ status: true, msg: 'Password changed successfully' });
  } catch (err) {
    res.status(500).send({ status: false, msg: 'Something went wrong' });
  }
};

exports.newEmail = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const { newEmail, password } = data;

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: `can't send empty body` })

    if (!newEmail) return res.status(400).send({ status: false, msg: `please provide the new email` })
    if (!password) return res.status(400).send({ status: false, msg: `please provide the password` })

    const checkUser = await userModel.findById(id)
    if (!checkUser) return res.status(404).send({ status: false, msg: `User not found` })
    const isMatch = await bcrypt.compare(password, checkUser.password)
    if (!isMatch) return res.status(400).send({ status: false, msg: 'wrong password' })

    const NewEmailPresent = await userModel.findOne({ email: newEmail })
    if (NewEmailPresent) return res.status(400).send({ status: false, msg: 'new user already present in db please use another email id' })

    if (!data.verification) { data.verification = {} }
    if (!data.verification.Newemail) { data.verification.Newemail = {} }

    const randomOtp = Math.floor(1000 + Math.random() * 9000)
    const currentDate = new Date();
    const otpExpiry = new Date(currentDate.getTime() + 5 * 60 * 1000); // 5 minutes from now

    const DB = await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          'verification.Newemail.userOtp': randomOtp,
          'verification.Newemail.email': newEmail,
          'verification.Newemail.otpExpiry': otpExpiry
        }
      }
    )
    changeEmail(DB.name,newEmail,randomOtp);
    console.log(randomOtp)
    res.status(200).send({ status: true, msg: 'Successfully send OTP on your new email' })
  }
  catch (err) {

  }
}
exports.verifynewEmailOtp = async (req, res) => {
  try {
    const { id } = req.params;
    const { newOtp } = req.body;

    if (!newOtp) {
      return res.status(400).json({ status: false, msg: 'Please provide OTP' });
    }

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ status: false, msg: 'User not found' });
    }

    const storedOtp = user?.verification?.Newemail?.userOtp;

    if (!storedOtp) {
      return res.status(400).json({ status: false, msg: 'No OTP found for verification' });
    }

    if (newOtp !== storedOtp) {
      return res.status(400).json({ status: false, msg: 'Incorrect OTP' });
    }

    await userModel.findByIdAndUpdate(id, {
      $set: { 'verification.Newemail.userOtp': true },
    });

    return res.status(200).json({ status: true, msg: 'OTP verified successfully' });

  } catch (err) {
    console.error('Error verifying OTP:', err);
    return res.status(500).json({ status: false, msg: 'Internal server error' });
  }
};
