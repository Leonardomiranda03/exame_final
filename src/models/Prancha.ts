import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Prancha extends Model {
  public id!: number;
  public quantidade!: number;
  public tamanhoEmPes!: number;
  public cor!: string;
}

Prancha.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tamanhoEmPes: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Prancha',
    tableName: 'pranchas',
    timestamps: false,
  }
);

export default Prancha;

