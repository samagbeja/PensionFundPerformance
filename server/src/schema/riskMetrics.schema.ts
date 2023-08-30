import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import Investments from "./investments.schema";

class RiskMetrics extends Model {}

RiskMetrics.init(
  {
    // Model attributes are defined here
    riskId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    investmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Investments, // Can be both a string representing the table name or a Sequelize model
        key: "investmentId",
      },
    },
    riskCategory: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    riskIndicator: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    riskLevel: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    riskDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "RiskMetrics",
  }
);

export interface RiskMetricsInput {
  riskId?: number;
  investmentId: number;
  riskCategory: string;
  riskIndicator: string;
  riskLevel: number;
  riskDate: Date;
}

export default RiskMetrics;
