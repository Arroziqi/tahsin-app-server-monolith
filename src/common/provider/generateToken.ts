import { v4 as uuid } from 'uuid';

export const generateToken: () => string = (): string => {
  return uuid();
};
