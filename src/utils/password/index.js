import bcrypt from 'bcrypt';

export const generateHash = async (password, rounds=14) => {
  let hash = await bcrypt.hash(password, rounds);
  return hash;
};

export const compareHash = async (password, hash) => {
  let result = await bcrypt.compare(password, hash);
  return result;
};
