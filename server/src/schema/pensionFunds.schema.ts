import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";

class PensionFunds extends Model {}

PensionFunds.init(
  {
    // Model attributes are defined here
    fundId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fundName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fundType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fundAssets: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    fundStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "PensionFunds",
  }
);

export default PensionFunds;
