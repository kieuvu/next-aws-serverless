// models/Image.ts

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../_utils/Database";

class Image extends Model {
  public id!: number;
  public name!: string;
  public bucket!: string;
  public author!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bucket: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "images",
  },
);

Image.sync();

export default Image;
