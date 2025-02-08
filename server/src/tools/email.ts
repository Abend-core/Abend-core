import transporter from "../mail/email";
import config from "config";
const user: string = config.get("mail.user");
async function sendVerificationEmail(to: string) {
    const mailOptions = {
        from: user,
        to,
        subject: "Vérification de votre compte",
        html: `Salut lucas, rejoins abend core ! <a href="http://abend-core.org">Clique ici</a> <h1>GROS TITRE</h1>`, // Utilisation de la propriété html
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email envoyé à:", to);
}

export { sendVerificationEmail };
