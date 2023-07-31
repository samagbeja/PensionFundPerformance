import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import Users from "./users.schema";



class AuditTrail extends Model {}

AuditTrail.init(
  {
    // Model attributes are defined here
    auditId: {
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
    activityDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    activityDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
   
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "AuditTrail",
   
  }
);



export default AuditTrail;
