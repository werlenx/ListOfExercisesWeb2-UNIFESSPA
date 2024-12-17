const express = require('express');
const enderecoController = require('../controllers/enderecoController');

const router = express.Router();

router.get('/lista', enderecoController.listarEnderecos);
router.get('/:id', enderecoController.buscarEndereco);
router.post('/', enderecoController.criarEnderecos);
router.put('/:id', enderecoController.atualizarEnderecos);
router.delete('/:id', enderecoController.excluirEnderecos);

module.exports = router;
