const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rotas para produtos
router.post('/create', produtoController.criarProduto);
router.get('/list', produtoController.listarProdutos);
router.get('/:id', produtoController.buscarProduto);
router.put('/:id', produtoController.atualizarProduto);
router.delete('/:id', produtoController.excluirProduto);

module.exports = router;
