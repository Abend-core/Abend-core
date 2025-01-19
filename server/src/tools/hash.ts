import bcrypt from "bcryptjs";

export const hash = async (value: string): Promise<string> => {
  const data = await bcrypt.hash(value, 10);
  return data;
};

export const compare = async (
  value: string,
  valueHash: string
): Promise<boolean> => {
  const data = await bcrypt.compare(value, valueHash);
  return data;
};

exports = { hash, compare };
