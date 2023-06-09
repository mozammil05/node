
import nodemailer from "nodemailer";



const sendMail = async (html, to) => {

    
      var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 567,
      auth: {
        user: "mozammil@immunebytes.com",
        pass: "yrrriyyhssdwwxer",
      },
    });

    var mailOptions = {
      from: "mozammil@immunebytes.com",
      to: to,
      subject: "Password Reset",
        html: html,
    };

   await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

}

export default sendMail;