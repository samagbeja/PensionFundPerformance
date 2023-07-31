import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";




class ResearchSurveys extends Model {}

ResearchSurveys.init(
  {
    // Model attributes are defined here
    surveyId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  
    surveyTitle: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    surveyDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    surveyStartDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    surveyEndDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
   
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "ResearchSurveys",
   
  }
);



export default ResearchSurveys;
