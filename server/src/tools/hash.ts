import bcrypt from "bcryptjs";


class Crypt{

  async hash (value: string): Promise<string>{
    const data = await bcrypt.hash(value, 10);
    return data;
  }

  async compare (value: string, valueHash: string): Promise<boolean>{
    const data = await bcrypt.compare(value, valueHash);
    return data;
  };

}

export default new Crypt();
