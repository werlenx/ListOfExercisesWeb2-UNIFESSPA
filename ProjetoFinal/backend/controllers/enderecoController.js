const Endereco = require('../models/Endereco');
const Usuario = require('../models/Usuario');
const Estabelecimento = require('../models/Estabelecimento');

module.exports = {
  async listarEnderecos(req, res) {
    try {
      const enderecos = await Endereco.findAll({
        include: [
          { model: Usuario, as: 'usuario', attributes: ['nome'] },
          { model: Estabelecimento, as: 'estabelecimento', attributes: ['nome_fantasia'] },
        ],
      });
      res.status(200).json(enderecos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar endereços: ' + error.message });
    }
  },

  async criarEnderecos(req, res) {
    const { logradouro, numero, complemento, bairro, cidade, estado, cep, id_usuario, id_estabelecimento } = req.body;

    try {
      if (!id_usuario && !id_estabelecimento) {
        return res.status(400).json({ error: 'Informe id_usuario ou id_estabelecimento.' });
      }

      const endereco = await Endereco.create({
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep,
        id_usuario,
        id_estabelecimento,
      });
      res.status(201).json(endereco);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar endereço: ' + error.message });
    }
  },

  async atualizarEnderecos(req, res) {
    const { id } = req.params;
    const { logradouro, numero, complemento, bairro, cidade, estado, cep } = req.body;

    try {
      const endereco = await Endereco.findByPk(id);
      if (!endereco) {
        return res.status(404).json({ error: 'Endereço não encontrado.' });
      }

      await endereco.update({ logradouro, numero, complemento, bairro, cidade, estado, cep });
      res.status(200).json(endereco);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar endereço: ' + error.message });
    }
  },

  async excluirEnderecos(req, res) {
    const { id } = req.params;

    try {
      const endereco = await Endereco.findByPk(id);
      if (!endereco) {
        return res.status(404).json({ error: 'Endereço não encontrado.' });
      }

      await endereco.destroy();
      res.status(200).json({ message: 'Endereço excluído com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir endereço: ' + error.message });
    }
  },

  async buscarEndereco(req, res) {
    const { id } = req.params;

    try {
      const endereco = await Endereco.findByPk(id, {
        include: [
          { model: Usuario, as: 'usuario', attributes: ['nome'] },
          { model: Estabelecimento, as: 'estabelecimento', attributes: ['nome_fantasia'] },
        ],
      });
      if (!endereco) {
        return res.status(404).json({ error: 'Endereço não encontrado.' });
      }
      res.status(200).json(endereco);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar endereço: ' + error.message });
    }
  },
};
