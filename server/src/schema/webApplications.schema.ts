import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";



class WebApplications extends Model {}

WebApplications.init(
  {
    // Model attributes are defined here
    appId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
   
    appName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    appDescription: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    appVendor: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    integrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },

    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "WebApplications",
   
  }
);


export default WebApplications;
