const Permissao = require('../models/Permissao');

const listarPermissoes = async (req, res) => {
  try {
    const permissoes = await Permissao.findAll();
    res.json(permissoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar permissões: ' + error.message });
  }
};

const criarPermissao = async (req, res) => {
  const { nome, descricao } = req.body;
  try {
    const permissaoCriada = await Permissao.create({
      nome,
      descricao,
    });
    res.status(201).json(permissaoCriada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar permissão: ' + error.message });
  }
};

const criarPermissoesEmLote = async (req, res) => {
  const permissoes = req.body; // [{ nome, descricao }, ...]

  if (!Array.isArray(permissoes)) {
    return res.status(400).json({ error: 'Formato inválido! Envie um array de permissões.' });
  }

  try {
    for (const permissao of permissoes) {
      if (!permissao.nome || !permissao.descricao) {
        return res.status(400).json({ error: 'Todos os itens devem conter os campos "nome" e "descricao".' });
      }
    }

    const permissoesCriadas = await Permissao.bulkCreate(permissoes);

    res.status(201).json(permissoesCriadas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar permissões: ' + error.message });
  }
};

const atualizarPermissao = async (req, res) => {
  const { id_permissao } = req.params;
  const { nome, descricao } = req.body;

  try {
    const permissaoExistente = await Permissao.findByPk(id_permissao);
    if (!permissaoExistente) {
      return res.status(404).json({ error: 'Permissão não encontrada' });
    }

    permissaoExistente.nome = nome !== undefined ? nome : permissaoExistente.nome;
    permissaoExistente.descricao = descricao !== undefined ? descricao : permissaoExistente.descricao;

    await permissaoExistente.save();
    res.json(permissaoExistente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar permissão: ' + error.message });
  }
};

const deletarPermissao = async (req, res) => {
  const { id_permissao } = req.params;

  try {
    const permissaoExistente = await Permissao.findByPk(id_permissao);
    if (!permissaoExistente) {
      return res.status(404).json({ error: 'Permissão não encontrada' });
    }

    await permissaoExistente.destroy();
    res.json({ message: 'Permissão deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar permissão: ' + error.message });
  }
};

module.exports = {
  listarPermissoes,
  criarPermissao,
  atualizarPermissao,
  deletarPermissao,
  criarPermissoesEmLote,
};
