const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.UserNameNodeMailer,
    pass: process.env.PasswordNodeMailer,
  },
});

exports.verifyUser = async (name, email, randomOtp) => {
  console.log(name, email, randomOtp);

  try {
    const info = await transporter.sendMail({
      from: `"Supercar Vault 🚗" <${process.env.UserNameNodeMailer}>`,
      to: email,
      subject: "Your One-Time Password (OTP) - Supercar Vault",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #e60000;">🚗 Welcome to Supercar Vault, ${name}!</h2>
          <p style="font-size: 16px;">To verify your identity, please use the following One-Time Password (OTP):</p>
          <div style="font-size: 28px; font-weight: bold; background: #f4f4f4; padding: 15px 20px; border-radius: 5px; color: #333; text-align: center; letter-spacing: 2px;">
            ${randomOtp}
          </div>
          <p style="font-size: 14px; color: #555; margin-top: 20px;">This OTP is valid for the next 10 minutes. Please do not share this code with anyone.</p>
          <p style="font-size: 14px; color: #888;">— The Supercar Vault Team</p>
        </div>
      `,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (e) {
    console.log("Email error:", e.message);
  }
};
