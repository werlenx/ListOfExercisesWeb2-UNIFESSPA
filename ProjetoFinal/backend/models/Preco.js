const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');
const Estabelecimento = require('./Estabelecimento');
const Usuario = require('./Usuario');

class Preco extends Model {}

Preco.init(
  {
    id_preco: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_produto: {
      type: DataTypes.INTEGER,
      references: {
        model: Produto,
        key: 'id_produto',
      },
      onDelete: 'CASCADE',
    },
    id_estabelecimento: {
      type: DataTypes.INTEGER,
      references: {
        model: Estabelecimento,
        key: 'id_estabelecimento',
      },
      onDelete: 'CASCADE',
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    data_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: 'id_usuario',
      },
      onDelete: 'CASCADE',
    },
    confiabilidade: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Preco',
    tableName: 'preco',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Preco;
