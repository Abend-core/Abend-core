import nodemailer from "nodemailer";
import config from "config";

const user: string = config.get("mail.user");
const pass: string = config.get("mail.pass");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: user, // ton adresse Gmail
        pass: pass, // ton mot de passe ou mot de passe d'application
    },
    tls: {
        rejectUnauthorized: false, // Si tu veux ignorer les erreurs de certificat auto-signé
    },
});

export default transporter;
