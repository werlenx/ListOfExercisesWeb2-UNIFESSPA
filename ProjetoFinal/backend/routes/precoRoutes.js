const express = require('express');
const router = express.Router();
const { listarPrecos, criarPreco, atualizarPreco, deletarPreco, buscarPrecoPorId } = require('../controllers/precoController');


router.get('/lista', listarPrecos);
router.post('/', criarPreco);
router.get('/:id_preco', buscarPrecoPorId);
router.put('/:id_preco', atualizarPreco);
router.delete('/:id_preco', deletarPreco);

module.exports = router;
