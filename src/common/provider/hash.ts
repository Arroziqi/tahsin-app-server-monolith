import * as argon from 'argon2';

export const hashPassword: (password: string) => Promise<string> = async (
  password: string,
): Promise<string> => {
  return await argon.hash(password);
};

export const verifyPassword: (
  password: string,
  hash: string,
) => Promise<boolean> = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await argon.verify(hash, password);
};
