import { hashSync } from "bcryptjs";

export const hashPassword = (password) => {
  return hashSync(password, 10);
};
