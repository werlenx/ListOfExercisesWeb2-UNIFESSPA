const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


async function criarUsuario(req, res) {

  try {
    const { nome, email, senha, tipo_usuario } = req.body;

    const usuario = await Usuario.create({
      nome,
      email,
      senha:senha,
      tipo_usuario
    });

    const { senha: _, ...usuarioSemSenha } = usuario.toJSON();

    res.status(201).json(usuarioSemSenha);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário: ' + error.message });
  }
}

async function autenticarUsuario(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(senha, usuario.senha);

    if (!isMatch) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign({ id_usuario: usuario.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erro ao autenticar: ' + error.message });
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários: ' + error.message });
  }
}
async function buscarUsuarioPorId(req, res) {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário: ' + error.message });
  }
}

async function atualizarUsuario(req, res) {
  const { id } = req.params;
  const { nome, email, senha, tipo_usuario } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }


    if (senha) {
      const hashedPassword = await bcrypt.hash(senha, 10);
      usuario.senha = hashedPassword;
    }

    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    usuario.tipo_usuario = tipo_usuario || usuario.tipo_usuario;

    await usuario.save();

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário: ' + error.message });
  }
}

async function excluirUsuario(req, res) {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await usuario.destroy();
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário: ' + error.message });
  }
}

module.exports = { 
  criarUsuario, 
  autenticarUsuario, 
  listarUsuarios, 
  buscarUsuarioPorId,
  atualizarUsuario,
  excluirUsuario
};
