const nodemailer = require("nodemailer");
const httpErrors = require("http-errors");

const sendMail = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_ADDRESS,
      pass: process.env.USER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.USER_ADDRESS,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw httpErrors.InternalServerError(error.message);
    } else {
      console.log("Email successfully sent");
    }
  });
};

module.exports = {
  sendMail,
};
