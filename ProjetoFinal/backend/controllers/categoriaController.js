const Categoria = require('../models/Categoria');

async function criarCategoria(req, res) {
  try {
    const { nome } = req.body;

    const novaCategoria = await Categoria.create({ nome });
    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar categoria: ' + error.message });
  }
}

async function listarCategorias(req, res) {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar categorias: ' + error.message });
  }
}

async function buscarCategoria(req, res) {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categoria: ' + error.message });
  }
}

async function atualizarCategoria(req, res) {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    categoria.nome = nome || categoria.nome;

    await categoria.save();
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar categoria: ' + error.message });
  }
}

async function excluirCategoria(req, res) {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    await categoria.destroy();
    res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir categoria: ' + error.message });
  }
}

module.exports = {
  criarCategoria,
  listarCategorias,
  buscarCategoria,
  atualizarCategoria,
  excluirCategoria,
};
