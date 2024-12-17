const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UsuarioPermissao extends Model {}

UsuarioPermissao.init(
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id_usuario'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      primaryKey: true 
    },
    id_permissao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Permissao',
        key: 'id_permissao'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      primaryKey: true
    }
  },
  {
    sequelize,
    modelName: 'UsuarioPermissao',
    tableName: 'usuario_permissao',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['id_usuario', 'id_permissao']
      }
    ]
  }
);

module.exports = UsuarioPermissao;
