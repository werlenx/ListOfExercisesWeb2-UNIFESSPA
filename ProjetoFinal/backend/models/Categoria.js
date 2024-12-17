const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Categoria extends Model {}

Categoria.init(
  {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categoria',
    timestamps: false,
    freezeTableName: true,
  }
);


module.exports = Categoria;
