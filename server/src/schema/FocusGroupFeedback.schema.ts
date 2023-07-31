import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import FocusGroupSessions from "./FocusGroupSessions.schema";
import Users from "./users.schema";


class FocusGroupFeedback extends Model {}

FocusGroupFeedback.init(
  {
    // Model attributes are defined here
    feedbackId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },  
    sessionId: {
        type: DataTypes.INTEGER,
        references: {
            model: FocusGroupSessions, // Can be both a string representing the table name or a Sequelize model
            key: 'sessionId', 
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users, // Can be both a string representing the table name or a Sequelize model
            key: 'userId', 
        }
    },
    feedbackText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    feedbackDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },   
   
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "FocusGroupFeedback",
   
  }
);

FocusGroupSessions.hasMany(FocusGroupFeedback)
Users.hasMany(FocusGroupFeedback)


export default FocusGroupFeedback;
