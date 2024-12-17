const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');

async function criarProduto(req, res) {
  try {
    const { nome, descricao, id_categoria } = req.body;

    const produto = await Produto.create({ nome, descricao, id_categoria });
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto: ' + error.message });
  }
}


async function listarProdutos(req, res) {
  try {
    const produtos = await Produto.findAll({
      include: {
        model: Categoria,
        as: 'categoria',
        attributes: ['nome'],
      },
    });
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar produtos: ' + error.message });
  }
}


async function buscarProduto(req, res) {
  try {
    const { id } = req.params;

    const produto = await Produto.findByPk(id, {
      include: {
        model: Categoria,
        as: 'categoria',
        attributes: ['nome'],
      },
    });

    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto: ' + error.message });
  }
}


async function atualizarProduto(req, res) {
  try {
    const { id } = req.params;
    const { nome, descricao, id_categoria } = req.body;

    const produto = await Produto.findByPk(id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

    produto.nome = nome || produto.nome;
    produto.descricao = descricao || produto.descricao;
    produto.id_categoria = id_categoria || produto.id_categoria;

    await produto.save();
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto: ' + error.message });
  }
}


async function excluirProduto(req, res) {
  try {
    const { id } = req.params;

    const produto = await Produto.findByPk(id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

    await produto.destroy();
    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir produto: ' + error.message });
  }
}

module.exports = {
  criarProduto,
  listarProdutos,
  buscarProduto,
  atualizarProduto,
  excluirProduto,
};
