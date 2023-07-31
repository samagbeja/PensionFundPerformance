import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import ResearchSurveys from "./researchSurveys.schema";




class SurveyQuestions extends Model {}

SurveyQuestions.init(
  {
    // Model attributes are defined here
    questionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  
    surveyId: {
        type: DataTypes.INTEGER,
        references: {
            model: ResearchSurveys, // Can be both a string representing the table name or a Sequelize model
            key: 'surveyId', 
        }
    },
    questionText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    questionType: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    
   
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "SurveyQuestions",
   
  }
);



export default SurveyQuestions;
