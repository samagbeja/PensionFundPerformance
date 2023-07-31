import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";



class CommunicationChannels extends Model {}

CommunicationChannels.init(
  {
    // Model attributes are defined here
    channelId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
   
    channelName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    channelType: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "CommunicationChannels",
   
  }
);


export default CommunicationChannels;
