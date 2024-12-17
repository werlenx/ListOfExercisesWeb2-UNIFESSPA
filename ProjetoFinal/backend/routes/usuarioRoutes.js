const express = require('express')
const router = express.Router()
const categoria = require('../controllers/UsuarioController')


router.post('/criar', categoria.criarUsuario)
router.post('/login', categoria.autenticarUsuario)
router.get('/lista', categoria.listarUsuarios)
router.get('/:id', categoria.buscarUsuarioPorId)
router.put('/:id', categoria.atualizarUsuario)
router.delete('/:id', categoria.excluirUsuario)


module.exports = router;
