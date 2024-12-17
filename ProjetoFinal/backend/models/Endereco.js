const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Estabelecimento = require('./Estabelecimento');

class Endereco extends Model {}

Endereco.init(
  {
    id_endereco: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    logradouro: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    complemento: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    bairro: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    cidade: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: 'id_usuario',
      },
      allowNull: true,
    },
    id_estabelecimento: {
      type: DataTypes.INTEGER,
      references: {
        model: Estabelecimento,
        key: 'id_estabelecimento',
      },
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Endereco',
    tableName: 'endereco',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Endereco;
