const nodemailer = require("nodemailer");
const ics = require("ics");

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
};

const send = async (data) => {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info.response;
    }
  });
};

const sendWithIcs = async (data, event) => {
  ics.createEvent(event, async (err, value) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(value);
    const message = {
      ...data,
      icalEvent: {
        filename: "invitation.ics",
        method: "REQUEST",
        content: value,
      },
    };
    await send(message);
  });
};

module.exports = { send, sendWithIcs };
