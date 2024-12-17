const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LogAcessoNegado = sequelize.define('LogAcessoNegado', {
    id_log: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id_usuario',
        },
        allowNull: false,
    },
    id_permissao: {
        type: DataTypes.INTEGER,
        references: {
            model: 'permissoes',
            key: 'id_permissao',
        },
        allowNull: false,
    },
    data_tentativa: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    mensagem: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'log_acesso_negado',
    timestamps: false,
});


module.exports = LogAcessoNegado;
