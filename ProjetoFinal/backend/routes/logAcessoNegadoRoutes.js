const express = require('express');
const logAcessoNegadoController = require('../controllers/logAcessoNegadoController');

const router = express.Router();

router.post('/', logAcessoNegadoController.criarLogAcessoNegado);
router.get('/', logAcessoNegadoController.buscarLogsAcessoNegado);
router.get('/:id_log', logAcessoNegadoController.buscarLogAcessoNegado);
router.delete('/:id_log', logAcessoNegadoController.excluirLogAcessoNegado);

module.exports = router;
