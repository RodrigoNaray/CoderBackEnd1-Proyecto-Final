import { sendEmail } from "../utils/sendEmail.js";

const emailSender = async (req, res) => {
  try{

    const {email, subject, message, html} = req.body

    await sendEmail(email, subject, message, html);

    res.status(200).send("Email sent")

  }catch(error){
    console.log(error);
    res.status(500).json({status: "error", msg: "Internal Server Error"})
  }
}

export default {
  emailSender
}