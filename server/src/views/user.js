const mariadb = require("../database/db");

users = mariadb.query(
  "CREATE VIEW IF NOT EXISTS Utilisateur AS SELECT name, firstname, mail, login FROM users"
);

module.exports = users;
