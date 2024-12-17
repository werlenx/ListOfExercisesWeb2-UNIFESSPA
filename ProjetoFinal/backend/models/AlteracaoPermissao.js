const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class AlteracaoPermissao extends Model {}

AlteracaoPermissao.init(
  {
    id_alteracao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id_usuario',
      },
    },
    id_permissao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'permissoes',
        key: 'id_permissao',
      },
    },
    acao: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [['adicionar', 'remover']],
      },
    },
    data_alteracao: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  },
  {
    sequelize,
    modelName: 'AlteracaoPermissao',
    tableName: 'alteracao_permissao',
    timestamps: false,
  }
);

module.exports = AlteracaoPermissao;
