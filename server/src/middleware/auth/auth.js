const jwt = require("jsonwebtoken");
const privateKey = require("./key.js");

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res
      .status(401)
      .json({ message: "Vous n'avez pas fourni de jeton d'authentification." });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, privateKey);

    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      console.log("/////////////");
      console.log(req.body);
      console.log("//////////////////");
      return res
        .status(401)
        .json({ message: "L'identifiant de l'utilisateur est invalide." });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "L'utilisateur n'est pas autorisé à accéder à cette ressource.",
      date: error.message,
    });
  }
};
