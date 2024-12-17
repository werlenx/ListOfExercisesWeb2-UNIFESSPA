const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Permissao extends Model {}

Permissao.init(
  {
    id_permissao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Permissao',
    tableName: 'permissao',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Permissao;
