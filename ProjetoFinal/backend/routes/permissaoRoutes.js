const express = require('express');
const router = express.Router();
const PermissaoController = require('../controllers/permissaoController');

router.get('/lista', PermissaoController.listarPermissoes);
router.post('/', PermissaoController.criarPermissao);
router.post('/criar-em-lote', PermissaoController.criarPermissoesEmLote)
router.put('/:id_permissao', PermissaoController.atualizarPermissao);
router.delete('/:id_permissao', PermissaoController.deletarPermissao);

module.exports = router;
