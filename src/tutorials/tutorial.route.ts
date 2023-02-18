import Ajv from "ajv";
import type { Router, Response, NextFunction } from "express";
import express from "express";

import { parse } from "../utils/parse";
import {
  createTutorial,
  deleteAllTutorials,
  deleteTutorial,
  generateTokenTutorial,
  getTutorialById,
  getTutorials,
  updateTutorial,
} from "./tutorial.service";
import {
  createdTutorialSchema,
  updatedTutorialSchema,
} from "./tutorial.schema";
import { CustomRequest } from "../users/user.model";
import { PublishedStatus } from "./tutorial.model";
1;

const ajv = new Ajv({ allErrors: true });
let validate: Ajv.ValidateFunction;

const router: Router = express.Router();

router.post(
  "/",
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      validate = ajv.compile(createdTutorialSchema);
      const valid = validate(req.body);
      if (!valid) parse(validate.errors);

      const result = await createTutorial(req.body);
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id(\\d+)",
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    try {
      validate = ajv.compile(updatedTutorialSchema);
      const valid = validate(req.body);
      if (!valid) parse(validate.errors);

      req.body.publishedStatus = PublishedStatus.UPDATED;
      const result = await updateTutorial(id, req.body);
      res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.delete(
  "/:id(\\d+)",
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    try {
      const result = await deleteTutorial(id);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/token",
  (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw Error("Invalid user");

      const result = generateTokenTutorial(req.user);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const filter = {
        title: req.query?.title as string,
        description: req.query?.description as string,
        sort: req.query?.sort as string,
      };

      const result = await getTutorials(filter);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id(\\d+)",
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    try {
      const result = await getTutorialById(id);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/mass_delete",
  async (_: CustomRequest, res: Response, next: NextFunction) => {
    try {
      await deleteAllTutorials();
      res.send({});
    } catch (error) {
      next(error);
    }
  }
);

export const TutorialRouter: Router = router;
