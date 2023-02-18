import type { Response, NextFunction } from "express";
import { CustomRequest, Role } from "../users/user.model";

export const validateRole = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    req.user?.role === Role.USER &&
    (req.method !== "GET" || req.path === "api/v1/tutorials/token")
  )
    return res.status(403).send("Users can only perform read only actions");

  next();
};
