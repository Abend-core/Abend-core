import crypto from "crypto";

const generateKey = (login: string) => {
  return crypto.createHash("sha256").update(login).digest();
};

const encrypt = (value: string, login: string) => {
  const secretKey = generateKey(login);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encrypted = cipher.update(value, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
};

const decrypt = (value: string, login: string) => {
  const secretKey = generateKey(login);
  const [ivHex, dataHex] = value.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
  let decrypted = decipher.update(dataHex, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

const encryptObj = (obj: Record<string, string>, login: string) => {
  for (const property in obj) {
    console.log(typeof obj[property]);
    if (typeof obj[property] == "string") {
      obj[property] = encrypt(obj[property], login);
    }
  }
  return obj;
};
const decryptObj = (obj: Record<string, string>, login: string) => {
  for (const property in obj) {
    if (typeof obj[property] != "boolean") {
      obj[property] = decrypt(obj[property], login);
    }
  }
  return obj;
};

exports = { encrypt, decrypt, encryptObj, decryptObj };
