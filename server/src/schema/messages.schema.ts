import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import Stakeholders from "./stakeholders.schema";



class Messages extends Model {}

Messages.init(
  {
    // Model attributes are defined here
    messageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
   
    senderId: {
        type: DataTypes.INTEGER,
        references: {
            model: Stakeholders, // Can be both a string representing the table name or a Sequelize model
            key: 'stakeholderId'
        }
    },
    recieverId: {
        type: DataTypes.INTEGER,
        references: {
            model: Stakeholders, // Can be both a string representing the table name or a Sequelize model
            key: 'stakeholderId'
        }
    },
    subject: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sentDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "Messages",
   
  }
);





export default Messages;
