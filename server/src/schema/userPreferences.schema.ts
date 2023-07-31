import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import Users from "./users.schema";



class userPreferences extends Model {}

userPreferences.init(
  {
    // Model attributes are defined here
    preferenceId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users, // Can be both a string representing the table name or a Sequelize model
            key: 'userId', 
        }
    },
    preferenceName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    preferenceValue: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
   
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "userPreferences",
   
  }
);



export default userPreferences;
