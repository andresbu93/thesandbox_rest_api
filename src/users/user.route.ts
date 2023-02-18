import express, { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import Ajv from "ajv";

import { userAuthSchema } from "./user.schema";
import { auth } from "./user.service";
import { User } from "./user.model";
import { parse } from "../utils/parse";

const ajv = new Ajv({ allErrors: true });
const validate: Ajv.ValidateFunction = ajv.compile(userAuthSchema);

const router: Router = express.Router();

router.post(
  "/auth",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const valid = validate(req.body);
      if (!valid) parse(validate.errors);

      const result = await auth(<User>req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

export const UserRouter: Router = router;
