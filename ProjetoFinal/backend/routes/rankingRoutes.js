const express = require('express');
const router = express.Router();
const RankingController = require('../controllers/rankingController');

router.get('/', RankingController.listarRankings);
router.post('/', RankingController.criarRanking);
router.put('/', RankingController.atualizarRanking);
router.delete('/:id_usuario', RankingController.deletarRanking);

module.exports = router;
