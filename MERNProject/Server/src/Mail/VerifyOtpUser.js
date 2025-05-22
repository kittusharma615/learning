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
 

exports.changeEmail = async (name, email, randomOtp) => {

  try {
    const info = await transporter.sendMail({
      from: `"Supercar Vault 🚗" <${process.env.UserNameNodeMailer}>`,
      to: email,
      subject: "Email Change Verification - Supercar Vault",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Email Change Verification</title>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { color: #d62b1f; text-align: center; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
            .otp-container { 
              background: #f8f8f8; 
              padding: 15px; 
              border-radius: 5px; 
              text-align: center; 
              margin: 20px 0;
              font-size: 24px;
              letter-spacing: 3px;
              font-weight: bold;
              color: #d62b1f;
            }
            .footer { 
              margin-top: 30px; 
              padding-top: 15px; 
              border-top: 1px solid #eee; 
              font-size: 12px; 
              color: #777;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #d62b1f;
              color: white !important;
              text-decoration: none;
              border-radius: 4px;
              margin-top: 15px;
            }
          </style>
      </head>
      <body>
          <div class="logo">SUPERCAR VAULT</div>
          <h2 class="header">Email Change Verification</h2>
          
          <p>Hello ${name},</p>
          
          <p>We received a request to change the email address associated with your Supercar Vault account.</p>
          
          <p>Please use the following verification code to confirm this change:</p>
          
          <div class="otp-container">${randomOtp}</div>
          
          <p>This code will expire in <strong>10 minutes</strong>. If you didn't request this change, please contact our support team immediately.</p>
          
          <p>For security reasons, please do not share this code with anyone.</p>
          
          <p>Best regards,<br>The Supercar Vault Team</p>
          
          <div class="footer">
              <p>© ${new Date().getFullYear()} Supercar Vault. All rights reserved.</p>
              <p>If you're having trouble with the code, you can contact us at <a href="mailto:support@supercarvault.com">support@supercarvault.com</a></p>
          </div>
      </body>
      </html>
      `,
    });

    console.log("Verification email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send verification email:", error.message);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};
