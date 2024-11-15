const nodemailer = require("nodemailer");
const ContactRepository = require("../../database/models/ContactRepository");

const contactRepository = new ContactRepository();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const browse = async (req, res) => {
  try {
    const contacts = await contactRepository.readAll();
    res.json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des contacts" });
  }
};

const sendContactEmail = (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res
      .status(400)
      .send("Toutes les données requises ne sont pas fournies");
  }

  const mailOptions = {
    from: email, // replace with your sender email
    to: 'recipient@example.com', // replace with recipient email
    subject: `Nouveau message de ${firstName} ${lastName}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return res.status(500).send("Erreur lors de l'envoi du message");
    }

    console.log("Email envoyé avec succès:", info.response);
    return res.status(200).send("Message envoyé avec succès");
  });

  // Return a placeholder response or undefined to satisfy the function's return requirement
   
};


 
  
module.exports = { sendContactEmail, browse };