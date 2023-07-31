import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";





class FocusGroupSessions extends Model {}

FocusGroupSessions.init(
  {
    // Model attributes are defined here
    sessionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  
    sessionDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    sessionTopic: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    sessionFacilitator: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    
   
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "FocusGroupSessions",
   
  }
);


export default FocusGroupSessions;
