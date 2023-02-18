import { PublishedStatus, Tutorial } from "./tutorial.model";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import type { User } from "../users/user.model";

export const createTutorial = (tutorial: Tutorial): Promise<Tutorial> =>
  Tutorial.create(tutorial);

export const updateTutorial = async (
  id: number,
  tutorial: Tutorial
): Promise<Tutorial | Error> => {
  const result = await Tutorial.findByPk(id);
  if (!result) throw Error("Tutorial not found");

  try {
    return await result.update(tutorial);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteTutorial = async (id: number): Promise<Tutorial> => {
  const result = await Tutorial.findByPk(id);
  if (!result) throw Error("Tutorial not found");

  result.publishedStatus = PublishedStatus.DELETED;

  await result.destroy();
  return result;
};

export const getTutorialById = async (id: number): Promise<Tutorial> => {
  const result = await Tutorial.findByPk(id);
  if (!result) throw Error("Tutorial not found");

  return result;
};

export const getTutorials = (filter: {
  title?: string;
  description?: string;
  sort?: string;
}): Promise<Tutorial[]> =>
  Tutorial.findAll({
    where: {
      title: { [Op.like]: `%${filter.title ?? ""}%` },
      description: { [Op.like]: `%${filter.description ?? ""}%` },
    },
    order: filter.sort ? [[filter.sort, "DESC"]] : [],
  });

export const deleteAllTutorials = () => Tutorial.truncate();

export const generateTokenTutorial = (user: User): { token: string } => {
  try {
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET ?? "secret",
      {
        expiresIn: 60 * 5,
      }
    );
    return { token };
  } catch (error) {
    throw error as Error;
  }
};
