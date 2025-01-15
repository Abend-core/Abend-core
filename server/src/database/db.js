const { Sequelize } = require("sequelize");
const logger = require("../tools/logger.js");

//Instanciation de la bdd
const mariadb = new Sequelize("abend-core", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: (msg) => {
    msg = msg.split(":")[1].trim();
    logger.info(msg);
  },
});

async function connect() {
  try {
    await mariadb.authenticate();
    console.log("Vous êtes connecté à la base de donnée");
  } catch (error) {
    console.error("Erreur de connection", error);
  }
}

//Test si la connection c'est bien effectué.
connect();

//Export de l'instance de bdd, afin de l'utilisé dans d'autre fichier.
module.exports = mariadb;
