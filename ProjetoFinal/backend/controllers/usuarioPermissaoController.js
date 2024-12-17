const { Usuario, Permissao} = require('../models');
const UsuarioPermissao = require('../models/usuarioPermissao');


const adicionarPermissaoUsuario = async (req, res) => {
  try {
    const { id_usuario, id_permissao } = req.body;

    // Validação dos dados
    if (!id_usuario || !id_permissao) {
      return res.status(400).json({ message: 'Dados faltando: id_usuario ou id_permissao não fornecidos.' });
    }

    // Verifica se o usuário existe
    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verifica se a permissão existe
    const permissao = await Permissao.findByPk(id_permissao);
    if (!permissao) {
      return res.status(404).json({ message: 'Permissão não encontrada.' });
    }

    // Verifica se a relação já existe
    const permissaoExistente = await UsuarioPermissao.findOne({
      where: { id_usuario, id_permissao }
    });

    if (permissaoExistente) {
      return res.status(400).json({ message: 'O usuário já possui essa permissão.' });
    }

    // Cria a relação entre usuário e permissão
    const novaPermissaoUsuario = await UsuarioPermissao.create({
      id_usuario,
      id_permissao
    });

    res.status(201).json({ message: 'Permissão adicionada com sucesso.', novaPermissaoUsuario });
  } catch (error) {
    console.error('Erro ao adicionar permissão:', error);
    res.status(500).json({ message: 'Erro ao adicionar permissão ao usuário.', error: error.message });
  }
};


const listarPermissoes = async (req, res) => {
  try {
    const permissoes = await Permissao.findAll();

    if (permissoes.length === 0) {
      return res.status(404).json({ message: 'Nenhuma permissão encontrada' });
    }

    res.status(200).json(permissoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar permissões' });
  }
};

const removerPermissaoUsuario = async (req, res) => {
  try {
    const { id_usuario, id_permissao } = req.params;

    const associacao = await UsuarioPermissao.findOne({
      where: {
        id_usuario,
        id_permissao
      }
    });

    if (!associacao) {
      return res.status(404).json({ message: 'Associação não encontrada' });
    }

    await associacao.destroy();

    res.status(200).json({ message: 'Permissão removida com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao remover permissão do usuário' });
  }
};

const listarPermissoesUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const permissoes = await UsuarioPermissao.findAll({
      where: { id_usuario },
      include: [
        {
          model: Permissao,
          as: 'permissoes'
        }
      ]
    });

    if (!permissoes.length) {
      return res.status(404).json({ message: 'Nenhuma permissão encontrada para este usuário' });
    }

    res.status(200).json(permissoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar permissões do usuário' });
  }
};

module.exports = {
  adicionarPermissaoUsuario,
  removerPermissaoUsuario,
  listarPermissoesUsuario,
  listarPermissoes
};
