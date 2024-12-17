const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

class Estabelecimento extends Model {}

Estabelecimento.init(
  {
    id_estabelecimento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_fantasia: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING(18),
      unique: true,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id_usuario',
      },
      onDelete: 'CASCADE',
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Estabelecimento',
    tableName: 'estabelecimento',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Estabelecimento;
