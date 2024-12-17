const AlteracaoPermissao = require('../models/AlteracaoPermissao');
const Usuario = require('../models/Usuario');
const Permissao = require('../models/Permissao');

exports.criarAlteracaoPermissao = async (req, res) => {
  try {
    const { id_usuario, id_permissao, acao } = req.body;

    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const permissao = await Permissao.findByPk(id_permissao);
    if (!permissao) {
      return res.status(404).json({ error: 'Permissão não encontrada' });
    }

    const alteracao = await AlteracaoPermissao.create({
      id_usuario,
      id_permissao,
      acao,
    });

    return res.status(201).json(alteracao);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar alteração de permissão' });
  }
};

exports.listarAlteracoes = async (req, res) => {
  try {
    const alteracoes = await AlteracaoPermissao.findAll({
      include: [
        { model: Usuario, as: 'usuario' },
        { model: Permissao, as: 'permissao' },
      ],
    });
    return res.status(200).json(alteracoes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar alterações de permissão' });
  }
};

exports.listarAlteracoesPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const alteracoes = await AlteracaoPermissao.findAll({
      where: { id_usuario },
      include: [
        { model: Usuario, as: 'usuario' },
        { model: Permissao, as: 'permissao' },
      ],
    });

    if (alteracoes.length === 0) {
      return res.status(404).json({ error: 'Nenhuma alteração encontrada para este usuário' });
    }

    return res.status(200).json(alteracoes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar alterações de permissão por usuário' });
  }
};

exports.listarAlteracoesPorPermissao = async (req, res) => {
  try {
    const { id_permissao } = req.params;
    const alteracoes = await AlteracaoPermissao.findAll({
      where: { id_permissao },
      include: [
        { model: Usuario, as: 'usuario' },
        { model: Permissao, as: 'permissao' },
      ],
    });

    if (alteracoes.length === 0) {
      return res.status(404).json({ error: 'Nenhuma alteração encontrada para esta permissão' });
    }

    return res.status(200).json(alteracoes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar alterações de permissão por permissão' });
  }
};

exports.deletarAlteracaoPermissao = async (req, res) => {
  try {
    const { id_alteracao } = req.params;
    const alteracao = await AlteracaoPermissao.findByPk(id_alteracao);

    if (!alteracao) {
      return res.status(404).json({ error: 'Alteração de permissão não encontrada' });
    }

    await alteracao.destroy();
    return res.status(200).json({ message: 'Alteração de permissão deletada com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao deletar alteração de permissão' });
  }
};
