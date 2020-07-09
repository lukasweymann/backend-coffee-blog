require('dotenv').config()
const express = require("express");
const router = express.Router();

const nodeMailer = require("nodemailer");

let transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/", (req, res, next) => {
  const mailInfo = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: req.body.subject,
    text: req.body.content,
    who: req.body.email,
    name: req.body.name,
  };

  console.log(mailInfo);
  // error handling goes here.
  transporter.sendMail(mailInfo, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = router;
