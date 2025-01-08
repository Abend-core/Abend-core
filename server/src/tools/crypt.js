const crypto = require("crypto");

const generateKey = (login) => {
  return crypto.createHash("sha256").update(login).digest();
};

const encrypt = (value, login) => {
  const secretKey = generateKey(login);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encrypted = cipher.update(value, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
};

const decrypt = (value, login) => {
  const secretKey = generateKey(login);
  const [ivHex, dataHex] = value.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
  let decrypted = decipher.update(dataHex, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

module.exports = { encrypt, decrypt };
