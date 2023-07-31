import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";



class marketUpdates extends Model {}

marketUpdates.init(
  {
    // Model attributes are defined here
    updateId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    updateDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updateContent: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    updateType: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
   
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "marketUpdates",
   
  }
);


export default marketUpdates;
