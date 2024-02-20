import * as bcrypt from 'bcryptjs';

async function decryptPassword(password: string, hash: string): Promise<boolean> {
  const result = await bcrypt.compare(password, hash);
  return result;
}

export default decryptPassword;
