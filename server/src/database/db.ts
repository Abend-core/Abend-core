import { Sequelize } from "sequelize";
import logger from "../tools/logger";
import config from "config";

const dbName: string = config.get("db.name");
const dbUser: string = config.get("db.user");
const dbPassword: string = config.get("db.password");
const dbHost: string = config.get("db.host");
const dbPort: number = config.get("db.port");
const dbDial: undefined = config.get("db.dialect");

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: dbDial,
    logging: (msg) => {
        msg = msg.split(":")[1].trim();
        logger.info(msg);
    },
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("   [MySQL] ✅ Connecté");
    } catch (error) {
        console.error("   [MySQL] ❌ Erreur", error);
    }
}

connect();

export default sequelize;
