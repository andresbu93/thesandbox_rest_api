import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import bcrypt from 'bcryptjs';
import type { Request } from 'express';

import { sequelize } from '../db/database';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface CustomRequest extends Request {
  user?: User;
}

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare role: Role;

  public async comparePassword(password: string): Promise<boolean> {
    const match = await bcrypt.compare(password, this.password);
    return match;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(Role)),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: false,
  }
);
