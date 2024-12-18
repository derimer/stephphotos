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

function sendContactEmail(req, res) {
  const { firstName, lastName, email, message } = req.body;

  // Vérification des données requises
  if (!firstName || !lastName || !email || !message) {
    res.status(400).send("Toutes les données requises ne sont pas fournies");
  }

  // Configuration de l'e-mail
  const mailOptions = {
    from: email, // Remplacez par votre adresse e-mail d'expéditeur
    to: "recipient@example.com", // Remplacez par l'adresse e-mail du destinataire
    subject: `Nouveau message de ${firstName} ${lastName}`,
    text: message,
  };

  // Envoi de l'e-mail
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return res.status(500).send("Erreur lors de l'envoi du message");
    }

    // Retourner une réponse en cas de succès
    return res.status(200).send("Message envoyé avec succès");
  });
}

module.exports = { sendContactEmail, browse };
