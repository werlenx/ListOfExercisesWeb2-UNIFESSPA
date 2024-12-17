const Estabelecimento = require('../models/Estabelecimento');
const Usuario = require('../models/Usuario');

async function criarEstabelecimento(req, res) {
  try {
    const { nome_fantasia, cnpj, id_usuario } = req.body;

    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const estabelecimento = await Estabelecimento.create({
      nome_fantasia,
      cnpj,
      id_usuario,
    });

    res.status(201).json(estabelecimento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar estabelecimento: ' + error.message });
  }
}

async function listarEstabelecimentos(req, res) {
  try {
    const estabelecimentos = await Estabelecimento.findAll({
      include: {
        model: Usuario,
        as: 'usuario',
        attributes: ['nome', 'email'],
      },
    });
    res.status(200).json(estabelecimentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar estabelecimentos: ' + error.message });
  }
}

async function buscarEstabelecimento(req, res) {
  try {
    const { id_estabelecimento } = req.params;
    const estabelecimento = await Estabelecimento.findByPk(id_estabelecimento, {
      include: {
        model: Usuario,
        as: 'usuario',
        attributes: ['nome', 'email'],
      },
    });

    if (!estabelecimento) {
      return res.status(404).json({ error: 'Estabelecimento não encontrado' });
    }

    res.status(200).json(estabelecimento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estabelecimento: ' + error.message });
  }
}

async function atualizarEstabelecimento(req, res) {
  try {
    const { id_estabelecimento } = req.params;
    const { nome_fantasia, cnpj, id_usuario } = req.body;

    const estabelecimento = await Estabelecimento.findByPk(id_estabelecimento);

    if (!estabelecimento) {
      return res.status(404).json({ error: 'Estabelecimento não encontrado' });
    }

    estabelecimento.nome_fantasia = nome_fantasia || estabelecimento.nome_fantasia;
    estabelecimento.cnpj = cnpj || estabelecimento.cnpj;
    estabelecimento.id_usuario = id_usuario || estabelecimento.id_usuario;

    await estabelecimento.save();

    res.status(200).json(estabelecimento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar estabelecimento: ' + error.message });
  }
}

async function excluirEstabelecimento(req, res) {
  try {
    const { id_estabelecimento } = req.params;
    const estabelecimento = await Estabelecimento.findByPk(id_estabelecimento);

    if (!estabelecimento) {
      return res.status(404).json({ error: 'Estabelecimento não encontrado' });
    }

    await estabelecimento.destroy();

    res.status(200).json({ message: 'Estabelecimento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir estabelecimento: ' + error.message });
  }
}

module.exports = {
  criarEstabelecimento,
  listarEstabelecimentos,
  buscarEstabelecimento,
  atualizarEstabelecimento,
  excluirEstabelecimento,
};
