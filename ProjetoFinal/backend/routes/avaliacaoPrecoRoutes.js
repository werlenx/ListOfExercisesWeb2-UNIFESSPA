const express = require('express');
const router = express.Router();
const categoria = require('../controllers/avaliacaoPrecoController');

router.post('/', categoria.criarAvaliacao);
router.get('/lista', categoria.listarAvaliacoes);
router.get('/:id', categoria.buscarAvaliacao);
router.put('/:id', categoria.atualizarAvaliacao);
router.delete('/:id', categoria.deletarAvaliacao);

module.exports = router;
