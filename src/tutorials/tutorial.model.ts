import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

import { sequelize } from "../db/database";

export class Tutorial extends Model<
  InferAttributes<Tutorial>,
  InferCreationAttributes<Tutorial>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare videoURL: string;
  declare description: string;
  declare publishedStatus: PublishedStatus;
  declare createdAt: string;
  declare updatedAt: string;
  declare deletedAt: Date;
}

export enum PublishedStatus {
  CREATED = "CREATED",
  DELETED = "DELETED",
  UPDATED = "UPDATED",
}

Tutorial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    videoURL: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    publishedStatus: {
      type: DataTypes.ENUM(...Object.values(PublishedStatus)),
      allowNull: false,
      defaultValue: "CREATED",
    },
    createdAt: {
      type: new DataTypes.DATE(),
    },
    updatedAt: {
      type: new DataTypes.DATE(),
    },
    deletedAt: {
      type: new DataTypes.DATE(),
    },
  },
  {
    tableName: "tutorials",
    sequelize,
    paranoid: true,
  }
);
