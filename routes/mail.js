require('dotenv').config()
const express = require("express");
const router = express.Router();
let bodyParser = require('body-parser');

let app = express();

app.use(express.static('src'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
    subject: req.body.emailToSubmit.subject,
    text: req.body.emailToSubmit.content,
    who: req.body.emailToSubmit.email,
    name: req.body.emailToSubmit.name,
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
