import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";

import Investments from "./investments.schema";


class PerformanceMetrics extends Model {}

PerformanceMetrics.init(
  { 
    // Model attributes are defined here
    metricId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    investmentId: {
       type:  DataTypes.INTEGER,
      references: {
        model: Investments, // Can be both a string representing the table name or a Sequelize model
        key: 'investmentId'
      }
    },
    metricName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      metricValue: {
        type: DataTypes.DECIMAL(18,4),
        allowNull: false,
      },
      metricDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "PerformanceMetrics",
   
  }
);




export default PerformanceMetrics;
