const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

const sendEmail = async (to, subject, text) => {
  console.log(to,subject,text)
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: to,
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès');
  } catch (error) {
    console.error('Une erreur est survenue lors de l\'envoie du mail', error);
  }
};

module.exports = { sendEmail };