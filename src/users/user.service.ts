import jwt from "jsonwebtoken";

import { User } from "./user.model";

const _generateToken = (user: User): string =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET ?? "secret",
    {
      expiresIn: "1h",
    }
  );

export const auth = async (user: User): Promise<{ token: string }> => {
  const result = await User.findOne({
    where: {
      email: user.email,
    },
  });
  if (!result) throw new Error("The User does not exists");

  const isMatch = await result.comparePassword(user.password);
  if (!isMatch) throw new Error("The email or password are incorrect");

  return { token: _generateToken(result) };
};
