const express = require('express');
const router = express.Router();
const usuarioPermissaoController = require('../controllers/usuarioPermissaoController');

router.post('/', usuarioPermissaoController.adicionarPermissaoUsuario);
router.delete('/remover/:id_usuario/:id_permissao', usuarioPermissaoController.removerPermissaoUsuario);
router.get('/:id_usuario', usuarioPermissaoController.listarPermissoesUsuario);
router.get('/lista', usuarioPermissaoController.listarPermissoes);

module.exports = router;
