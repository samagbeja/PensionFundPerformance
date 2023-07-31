import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import CaseStudies from "./caseStudies.schema";




class CaseStudyDetails extends Model {}

CaseStudyDetails.init(
  {
    // Model attributes are defined here
    detailId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  
    caseId: {
        type: DataTypes.INTEGER,
        references: {
            model: CaseStudies, // Can be both a string representing the table name or a Sequelize model
            key: 'caseId', 
        }
    },
    detailDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    detailDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
   
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "CaseStudies",
   
  }
);



export default CaseStudyDetails;
