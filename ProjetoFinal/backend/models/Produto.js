const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria');

class Produto extends Model {}

Produto.init(
  {
    id_produto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Categoria,
        key: 'id_categoria',
      },
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    modelName: 'Produto',
    tableName: 'produto',
    timestamps: false,
    freezeTableName: true,
  }
);


module.exports = Produto;
