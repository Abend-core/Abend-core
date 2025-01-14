const winston = require("winston");

// Créez une instance de logger avec winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: "./src/database/sequelize.log",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          ({ timestamp, level, message }) => `
[${timestamp}] 
${level.toUpperCase()}
${message}`
        )
      ),
    }),
  ],
});

module.exports = logger;
