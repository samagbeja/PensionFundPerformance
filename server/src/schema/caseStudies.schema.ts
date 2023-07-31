import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";




class CaseStudies extends Model {}

CaseStudies.init(
  {
    // Model attributes are defined here
    caseId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  
    caseTitle: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    caseDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    caseDate: {
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



export default CaseStudies;
