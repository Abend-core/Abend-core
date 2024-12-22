const mariadb = require("../database/db");

users = mariadb.query(
  "CREATE VIEW IF NOT EXISTS v_users AS SELECT name, firstname, mail, login FROM users"
);

module.exports = users;
