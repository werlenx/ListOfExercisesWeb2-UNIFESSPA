const AvaliacaoPreco = require('../models/AvaliacaoPreco');
const Preco = require('../models/Preco');
const Usuario = require('../models/Usuario');

const listarAvaliacoes = async (req, res) => {
  try {
    const avaliacoes = await AvaliacaoPreco.findAll({
      include: [
        { model: Preco, as: 'preco', attributes: ['preco'] },
        { model: Usuario, as: 'usuario', attributes: ['nome'] },
      ],
    });
    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar avaliações: ' + error.message });
  }
};

const buscarAvaliacao = async (req, res) => {
    const { id_avaliacao } = req.params;
  
    try {
      const avaliacao = await AvaliacaoPreco.findOne({
        where: { id_avaliacao },
        include: [
          { model: Preco, as: 'preco', attributes: ['preco'] },
          { model: Usuario, as: 'usuario', attributes: ['nome'] },
        ],
      });
  
      if (!avaliacao) {
        return res.status(404).json({ error: 'Avaliação não encontrada' });
      }
  
      res.json(avaliacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar avaliação: ' + error.message });
    }
  };
  

const criarAvaliacao = async (req, res) => {
  const { id_preco, id_usuario, likes } = req.body;
  try {
    const avaliacaoCriada = await AvaliacaoPreco.create({
      id_preco,
      id_usuario,
      likes,
    });
    res.status(201).json(avaliacaoCriada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar avaliação: ' + error.message });
  }
};

const atualizarAvaliacao = async (req, res) => {
  const { id_avaliacao } = req.params;
  const { likes } = req.body;
  
  try {
    const avaliacaoExistente = await AvaliacaoPreco.findByPk(id_avaliacao);
    if (!avaliacaoExistente) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }

    avaliacaoExistente.likes = likes !== undefined ? likes : avaliacaoExistente.likes;
    await avaliacaoExistente.save();
    res.json(avaliacaoExistente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar avaliação: ' + error.message });
  }
};

const deletarAvaliacao = async (req, res) => {
  const { id_avaliacao } = req.params;
  
  try {
    const avaliacaoExistente = await AvaliacaoPreco.findByPk(id_avaliacao);
    if (!avaliacaoExistente) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }

    await avaliacaoExistente.destroy();
    res.json({ message: 'Avaliação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar avaliação: ' + error.message });
  }
};

module.exports = {
  listarAvaliacoes,
  criarAvaliacao,
  atualizarAvaliacao,
  deletarAvaliacao,
  buscarAvaliacao,
};
