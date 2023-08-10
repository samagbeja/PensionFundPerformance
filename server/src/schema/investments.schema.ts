import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import PensionFunds from "./pensionFunds.schema";

class Investments extends Model {}

Investments.init(
  {
    // Model attributes are defined here
    investmentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fundId: {
      type: DataTypes.INTEGER,
      references: {
        model: PensionFunds, // Can be both a string representing the table name or a Sequelize model
        key: "fundId",
      },
    },
    investmentName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    investmentType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    investmentSector: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    investmentAmount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    investmentStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    investmentEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "Investments",
  }
);

export interface investmentInput {
  fundId: number;
  investmentName: string;
  investmentType: string;
  investmentSector: string;
  investmentAmount: number;
  investmentStartDate: Date;
  investmentEndDate: Date;
}

export default Investments;
