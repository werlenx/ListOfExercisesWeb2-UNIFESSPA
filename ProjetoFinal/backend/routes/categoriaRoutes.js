const express = require('express');
const router = express.Router();
const categoria = require('../controllers/categoriaController');

router.post('/create', categoria.criarCategoria);
router.get('/list', categoria.listarCategorias);
router.get('/:id', categoria.buscarCategoria);
router.put('/:id', categoria.atualizarCategoria);
router.delete('/:id', categoria.excluirCategoria);

module.exports = router;
