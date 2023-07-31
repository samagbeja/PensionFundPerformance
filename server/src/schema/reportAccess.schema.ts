import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import Reports from "./reports.schema";
import Users from "./users.schema";



class ReportAccess extends Model {}

ReportAccess.init(
  {
    // Model attributes are defined here
    accessId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
   
    reportId: {
        type: DataTypes.INTEGER,
        references: {
            model: Reports, // Can be both a string representing the table name or a Sequelize model
            key: 'reportId', 
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users, // Can be both a string representing the table name or a Sequelize model
            key: 'userId', 
        }
    },
    accessLevel: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    
  },
  {
    // Other model options go here
    sequelize, 
    modelName: "ReportAccess",
   
  }
);



export default ReportAccess;
