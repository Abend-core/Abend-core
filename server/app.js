const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");
let corsOptions;

//Appel des models et les jointures
require("./src/database/join");
//Initialisation de la bdd
require("./src/database/init");

if (port == 5000) {
  corsOptions = {
    origin: [
      "http://localhost:5000",
      "http://localhost:5173",
      "http://127.0.0.1:5500",
    ],
    methods: ["GET", "HEAD", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "role"],
    maxAge: 3000,
  };
} else {
  corsOptions = {
    origin: "www.abend-core.com",
    methods: ["GET", "HEAD", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "role"],
    maxAge: 3000,
  };
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

const inscription = require("./src/routes/inscription");
app.use("/inscription", inscription);

const login = require("./src/routes/login");
app.use("/login", login);

const logout = require("./src/routes/logout");
app.use("/logout", logout);

const users = require("./src/routes/user");
app.use("/users", users);

const modules = require("./src/routes/module");
app.use("/modules", modules);

app.get("/", (req, res) => {
  res.send("Hello Abend !");
});

app.listen(port, () => {
  console.log("Serveur en ligne !");
});
