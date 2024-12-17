const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

class Ranking extends Model {}

Ranking.init(
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
    titulo: {
      type: DataTypes.ENUM('iniciante', 'avaliador', 'expert', 'mestre'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Ranking',
    tableName: 'ranking',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Ranking;
