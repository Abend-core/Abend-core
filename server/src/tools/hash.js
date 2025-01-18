import bcrypt from "bcryptjs";

const hash = async (value) => {
  const data = await bcrypt.hash(value, 10);
  return data;
};

const compare = async (value, valueHash) => {
  const data = await bcrypt.compare(value, valueHash);
  return data;
};

exports = { hash, compare };
