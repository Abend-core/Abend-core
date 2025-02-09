import transporter from "../mail/email";
import config from "config";
const user: string = config.get("mail.user");
async function sendVerificationEmail(to: string, token: string) {
  const mailOptions = {
    from: user,
    to,
    subject: "Vérification de votre compte",
    html: `
    <div
        style="
            text-align: center;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            max-width: 700px;
            margin: 0 auto;
        "
    >
        <div style="display: flex; flex-direction: column; align-items: center;">
            <p>Abend-core</p>
        </div>
        <p style="font-weight: bold">Vérifier votre compte</p>
        <p>Les informations de votre compte</p>
        <div
            style="
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            background-color: #e5e7eb17;
            "
        >
            <table style="width: 100%; border-collapse: collapse; text-align: left">
                <tr style="border-bottom: 1px solid #e5e7eb">
                    <td style="width: 30%; padding: 10px; font-weight: bold">Compte:</td>
                    <td style="padding: 10px">abendcore@gmail.com</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb">
                    <td style="width: 30%; padding: 10px; font-weight: bold">
                    Lien de vérification:
                    </td>
                    <td style="padding: 10px; word-break: break-all">
                        <a href="http://abend-core.org/verification/azerty" style="color: black">
                            http://abend-core.org/verification/azerty
                        </a>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center" style="padding-top: 20px;">
                        <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="center" bgcolor="#f82b30" style="border-radius: 6px;">
                                    <a
                                    href="http://abend-core.org/verification/azerty"
                                    style="
                                        color: white;
                                        text-decoration: none;
                                        background-color: #f82b30;
                                        padding: 6px;
                                        border-radius: 6px;
                                    "
                                    >
                                    Vérifier mon compte
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
      `,
    //   <img src="cid:logo_cid" alt="Abend-core Logo" style="width: 150px; height: 150px; margin-bottom: 20px;">

    // attachments: [
    //   {
    //     filename: "rudy.jpg",
    //     path: "../uploads/profil/rudy.jpg", // Assure-toi que ce chemin est correct
    //     cid: "logo_cid", // ID unique pour référencer l'image dans le HTML
    //   },
    // ],
  };

  await transporter.sendMail(mailOptions);
  console.log("✅ Email envoyé à:", to);
}

export { sendVerificationEmail };
