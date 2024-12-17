const Ranking = require('../models/Ranking');
const Usuario = require('../models/Usuario');

const listarRankings = async (req, res) => {
  try {
    const rankings = await Ranking.findAll({
      include: [
        { model: Usuario, as: 'usuario', attributes: ['nome'] },
      ],
    });
    res.json(rankings);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar rankings: ' + error.message });
  }
};

const criarRanking = async (req, res) => {
  const { id_usuario, confiabilidade, titulo } = req.body;
  try {
    const rankingCriado = await Ranking.create({
      id_usuario,
      confiabilidade,
      titulo,
    });
    res.status(201).json(rankingCriado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar ranking: ' + error.message });
  }
};

const atualizarRanking = async (req, res) => {
  const { id_usuario } = req.params;
  const { confiabilidade, titulo } = req.body;

  try {
    const rankingExistente = await Ranking.findByPk(id_usuario);
    if (!rankingExistente) {
      return res.status(404).json({ error: 'Ranking não encontrado' });
    }

    rankingExistente.confiabilidade = confiabilidade !== undefined ? confiabilidade : rankingExistente.confiabilidade;
    rankingExistente.titulo = titulo !== undefined ? titulo : rankingExistente.titulo;

    await rankingExistente.save();
    res.json(rankingExistente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar ranking: ' + error.message });
  }
};

const deletarRanking = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const rankingExistente = await Ranking.findByPk(id_usuario);
    if (!rankingExistente) {
      return res.status(404).json({ error: 'Ranking não encontrado' });
    }

    await rankingExistente.destroy();
    res.json({ message: 'Ranking deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar ranking: ' + error.message });
  }
};

module.exports = {
  listarRankings,
  criarRanking,
  atualizarRanking,
  deletarRanking,
};
