import bcrypt from "bcryptjs";

const hash = async (value: string): Promise<string> => {
  const data = await bcrypt.hash(value, 10);
  return data;
};

const compare = async (
  value: string,
  valueHash: string
): Promise<boolean> => {
  const data = await bcrypt.compare(value, valueHash);
  return data;
};

export { hash, compare };
