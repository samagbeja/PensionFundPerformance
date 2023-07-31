import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";



class Stakeholders extends Model {}

Stakeholders.init(
  {
    // Model attributes are defined here
    stakeholderId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
   
    stakeholderType: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    stakeholderName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    stakeholderEmail: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    registrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "Stakeholders",
   
  }
);


export default Stakeholders;
