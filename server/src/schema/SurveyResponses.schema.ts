import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import ResearchSurveys from "./researchSurveys.schema";
import Users from "./users.schema";
import SurveyQuestions from "./SurveyQuestions.schema";




class SurveyResponses extends Model {}

SurveyResponses.init(
  {
    // Model attributes are defined here
    responseId: {
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
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users, // Can be both a string representing the table name or a Sequelize model
            key: 'userId', 
        }
    },
    questionId: {
        type: DataTypes.INTEGER,
        references: {
            model: SurveyQuestions, // Can be both a string representing the table name or a Sequelize model
            key: 'questionId', 
        }
    },
    responseText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    responseDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
   
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "SurveyResponses",
   
  }
);

ResearchSurveys.hasMany(SurveyResponses)
Users.hasMany(SurveyResponses)
SurveyQuestions.hasMany(SurveyResponses)

export default SurveyResponses;
