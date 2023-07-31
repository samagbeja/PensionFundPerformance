import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
// @ts-ignore
import useBcrypt from "sequelize-bcrypt";

class Users extends Model {}

Users.init(
  {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    userType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Users", // We need to choose the model name
    // tableName: 'Employees'
  }
);

let options = {
  field: 'password', // secret field to hash, default: 'password'
  rounds: 12, // used to generate bcrypt salt, default: 12
  compare: 'authenticate', // method used to compare secrets, default: 'authenticate'
}

useBcrypt(Users, options);

export default Users;
