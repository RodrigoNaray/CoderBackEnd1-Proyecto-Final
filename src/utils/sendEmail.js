import nodemailer from "nodemailer";
import envsConfig from "../config/envs.config.js";

export const sendEmail = async (email, subject, message, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: envsConfig.GMAIL_EMAIL, // Email encargado de enviar mails
      pass: envsConfig.GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  await transporter.sendMail({
    from: envsConfig.GMAIL_EMAIL,
    to: email, // Destinatario de mi email
    subject: subject,
    text: message,
    html: html
  });
};
