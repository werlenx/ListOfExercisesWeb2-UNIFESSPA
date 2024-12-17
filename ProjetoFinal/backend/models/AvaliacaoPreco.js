const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Preco = require('./Preco');
const Usuario = require('./Usuario');

class AvaliacaoPreco extends Model {}

AvaliacaoPreco.init(
  {
    id_avaliacao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_preco: {
      type: DataTypes.INTEGER,
      references: {
        model: Preco,
        key: 'id_preco',
      },
      onDelete: 'CASCADE',
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: 'id_usuario',
      },
      onDelete: 'CASCADE',
    },
    likes: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    data_avaliacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'AvaliacaoPreco',
    tableName: 'avaliacao_preco',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = AvaliacaoPreco;
