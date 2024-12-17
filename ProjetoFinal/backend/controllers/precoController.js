const Preco = require('../models/Preco');
const Produto = require('../models/Produto');
const Estabelecimento = require('../models/Estabelecimento');
const Usuario = require('../models/Usuario');

const listarPrecos = async (req, res) => {
  try {
    const precos = await Preco.findAll({
      include: [
        { model: Produto, as: 'produto', attributes: ['nome'] },
        { model: Estabelecimento, as: 'estabelecimento', attributes: ['nome_fantasia'] },
        { model: Usuario, as: 'usuario', attributes: ['nome'] },
      ],
    });
    res.json(precos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar preços: ' + error.message });
  }
};

const criarPreco = async (req, res) => {
  const { id_produto, id_estabelecimento, preco, id_usuario, confiabilidade } = req.body;
  try {
    const precoCriado = await Preco.create({
      id_produto,
      id_estabelecimento,
      preco,
      id_usuario,
      confiabilidade,
    });
    res.status(201).json(precoCriado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar preço: ' + error.message });
  }
};

const atualizarPreco = async (req, res) => {
  const { id_preco } = req.params;
  const { preco, confiabilidade } = req.body;
  
  try {
    const precoExistente = await Preco.findByPk(id_preco);
    if (!precoExistente) {
      return res.status(404).json({ error: 'Preço não encontrado' });
    }
    
    precoExistente.preco = preco !== undefined ? preco : precoExistente.preco;
    precoExistente.confiabilidade = confiabilidade !== undefined ? confiabilidade : precoExistente.confiabilidade;
    
    await precoExistente.save();
    res.json(precoExistente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar preço: ' + error.message });
  }
};

const deletarPreco = async (req, res) => {
  const { id_preco } = req.params;
  
  try {
    const precoExistente = await Preco.findByPk(id_preco);
    if (!precoExistente) {
      return res.status(404).json({ error: 'Preço não encontrado' });
    }
    
    await precoExistente.destroy();
    res.json({ message: 'Preço deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar preço: ' + error.message });
  }
};

const buscarPrecoPorId = async (req, res) => {
  const { id_preco } = req.params;
  
  try {
    const preco = await Preco.findByPk(id_preco, {
      include: [
        { model: Produto, as: 'produto', attributes: ['nome'] },
        { model: Estabelecimento, as: 'estabelecimento', attributes: ['nome_fantasia'] },
        { model: Usuario, as: 'usuario', attributes: ['nome'] },
      ],
    });
    
    if (!preco) {
      return res.status(404).json({ error: 'Preço não encontrado' });
    }
    
    res.json(preco);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar preço: ' + error.message });
  }
};

module.exports = {
  listarPrecos,
  criarPreco,
  atualizarPreco,
  deletarPreco,
  buscarPrecoPorId,
};
