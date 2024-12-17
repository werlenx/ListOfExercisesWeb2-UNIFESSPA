const express = require('express');
const router = express.Router();
const EstabelecimentoController = require('../controllers/estabelecimentoController');

router.post('/', EstabelecimentoController.criarEstabelecimento);
router.get('/lista', EstabelecimentoController.listarEstabelecimentos);
router.get('/:id', EstabelecimentoController.buscarEstabelecimento);
router.put('/:id', EstabelecimentoController.atualizarEstabelecimento);
router.delete('/:id', EstabelecimentoController.excluirEstabelecimento);

module.exports = router;
