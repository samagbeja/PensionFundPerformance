import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";

class Reports extends Model {}

Reports.init(
  {
    // Model attributes are defined here
    reportId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    reportType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    reportDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reportFilePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "Reports",
  }
);

export interface ReportsInput {
  reportId?: number;
  reportType: string;
  reportDate: Date;
  reportFilePath: string;
}

export default Reports;
