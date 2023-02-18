import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { CustomRequest } from "../users/user.model";

const TOKEN_KEY: string = process.env.JWT_SECRET || "secret";

export const verifyTutorialToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "POST" && req.path === "/api/v1/tutorials/") {
    const token =
      req.body?.tutorialToken ||
      req.query?.tutorialToken ||
      req.headers["authentication-token"];

    if (!token) {
      return res.status(403).send("A token is required for create tutorial");
    }
    try {
      jwt.verify(token, TOKEN_KEY);
      return next();
    } catch (error) {
      return res.status(401).send("Invalid Token");
    }
  } else {
    next();
  }
};
