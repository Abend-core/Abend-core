const {Sequelize, DataTypes} = require('sequelize')

//Instanciation de la bdd
const mariadb = new Sequelize('firstNode', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mariadb'
})

async function connect(){
  try {
    await mariadb.authenticate();
    console.log('Vous êtes connecté à la base de donnée');
  } catch (error) {
    console.error('Erreur de connection', error);
  }
}

//Test si la connection c'est bien effectué.
connect()

//Export de l'instance de bdd, afin de l'utilisé dans d'autre fichier.
module.exports = mariadb