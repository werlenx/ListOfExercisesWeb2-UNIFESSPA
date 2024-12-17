const LogAcessoNegado = require('../models/LogAcessoNegado');
const Usuario = require('../models/Usuario');
const Permissao = require('../models/Permissao');


exports.criarLogAcessoNegado = async (req, res) => {
    try {
        const { id_usuario, id_permissao, mensagem } = req.body;

        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const permissao = await Permissao.findByPk(id_permissao);
        if (!permissao) {
            return res.status(404).json({ error: 'Permissão não encontrada' });
        }

        const log = await LogAcessoNegado.create({
            id_usuario,
            id_permissao,
            mensagem,
        });

        return res.status(201).json(log);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar log de acesso negado' });
    }
};

exports.buscarLogsAcessoNegado = async (req, res) => {
    try {
        const logs = await LogAcessoNegado.findAll({
            include: ['usuario', 'permissao'],
        });
        return res.status(200).json(logs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar logs de acesso negado' });
    }
};

exports.buscarLogAcessoNegado = async (req, res) => {
    try {
        const { id_log } = req.params;
        const log = await LogAcessoNegado.findByPk(id_log, {
            include: ['usuario', 'permissao'],
        });

        if (!log) {
            return res.status(404).json({ error: 'Log de acesso negado não encontrado' });
        }

        return res.status(200).json(log);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar log de acesso negado' });
    }
};

exports.excluirLogAcessoNegado = async (req, res) => {
    try {
        const { id_log } = req.params;
        const log = await LogAcessoNegado.findByPk(id_log);

        if (!log) {
            return res.status(404).json({ error: 'Log de acesso negado não encontrado' });
        }

        await log.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao excluir log de acesso negado' });
    }
};
