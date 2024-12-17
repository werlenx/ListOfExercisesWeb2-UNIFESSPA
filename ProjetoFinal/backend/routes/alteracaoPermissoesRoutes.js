const express = require('express');
const router = express.Router();
const alteracaoPermissaoController = require('../controllers/alteracaoPermissaoController');

router.post('/', alteracaoPermissaoController.criarAlteracaoPermissao);
router.get('/', alteracaoPermissaoController.listarAlteracoes);
router.get('/usuario/:id_usuario', alteracaoPermissaoController.listarAlteracoesPorUsuario);
router.get('/permissao/:id_permissao', alteracaoPermissaoController.listarAlteracoesPorPermissao);
router.delete('/:id_alteracao', alteracaoPermissaoController.deletarAlteracaoPermissao);

module.exports = router;
