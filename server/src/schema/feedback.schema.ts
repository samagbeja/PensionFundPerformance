import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import Users from "./users.schema";

class Feedback extends Model {}

Feedback.init(
  {
    // Model attributes are defined here
    feedbackId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: Users, // Can be both a string representing the table name or a Sequelize model
        key: "userId",
      },
    },
    feedbackText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    feedbackDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "Feedback",
  }
);

export interface FeedbackInput {
  feedbackId?: number;
  userId: number;
  feedbackText: string;
  feedbackDate: Date;
}

export default Feedback;
