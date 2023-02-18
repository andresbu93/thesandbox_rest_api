import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { CustomRequest, User } from "../users/user.model";

const TOKEN_KEY = process.env.JWT_SECRET || "secret";

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.path === "/api/v1/users/auth") {
    return next();
  }

  const token =
    req.body?.token || req.query?.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = <User>decoded;
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
  next();
};
