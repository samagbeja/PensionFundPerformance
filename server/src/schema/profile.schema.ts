import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";

class Profile extends Model {}

Profile.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otherName: {
      type: DataTypes.STRING,
    },
    // officeHeld  should be array.
    organizationType: {
      //should reference
      type: DataTypes.STRING,
    },
    publicID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Profile", // We need to choose the model name
    // tableName: 'Employees'
  }
);

export default Profile;
