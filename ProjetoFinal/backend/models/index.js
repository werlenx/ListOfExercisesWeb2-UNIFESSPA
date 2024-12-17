const Produto = require('./Produto');
const Preco = require('./Preco');
const Categoria = require('./Categoria');
const Usuario = require('./Usuario');
const Estabelecimento = require('./Estabelecimento');
const Endereco = require('./Endereco');
const AvaliacaoPreco = require('./AvaliacaoPreco')
const Ranking = require('./Ranking');
const Permissao = require('./Permissao');
const LogAcessoNegado = require('./LogAcessoNegado');
const AlteracaoPermissao = require('./AlteracaoPermissao');
const UsuarioPermissao = require('./usuarioPermissao');


Categoria.hasMany(Produto, {
  foreignKey: 'id_categoria',
  as: 'produtos',
});

Produto.belongsTo(Categoria, {
  foreignKey: 'id_categoria',
  as: 'categoria',
});

Estabelecimento.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

Usuario.hasOne(Estabelecimento, {
  foreignKey: 'id_usuario',
  as: 'estabelecimento',
});

Endereco.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

Usuario.hasMany(Endereco, {
  foreignKey: 'id_usuario',
  as: 'enderecos',
});

Endereco.belongsTo(Estabelecimento, {
  foreignKey: 'id_estabelecimento',
  as: 'estabelecimento',
});

Estabelecimento.hasMany(Endereco, {
  foreignKey: 'id_estabelecimento',
  as: 'enderecos',
});

Produto.hasMany(Preco, {
  foreignKey: 'id_produto',
  as: 'precos',
});

Preco.belongsTo(Produto, {
  foreignKey: 'id_produto',
  as: 'produto',
});

Estabelecimento.hasMany(Preco, {
  foreignKey: 'id_estabelecimento',
  as: 'precos',
});

Preco.belongsTo(Estabelecimento, {
  foreignKey: 'id_estabelecimento',
  as: 'estabelecimento',
});

Usuario.hasMany(Preco, {
  foreignKey: 'id_usuario',
  as: 'precos',
});

Preco.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

//-------
AvaliacaoPreco.belongsTo(Preco, {
  foreignKey: 'id_preco',
  as: 'preco',
});

Preco.hasMany(AvaliacaoPreco, {
  foreignKey: 'id_preco',
  as: 'avaliacoes',
});

AvaliacaoPreco.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

Usuario.hasMany(AvaliacaoPreco, {
  foreignKey: 'id_usuario',
  as: 'avaliacoesPreco',
});

Ranking.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

Usuario.hasOne(Ranking, {
  foreignKey: 'id_usuario',
  as: 'ranking',
});

Usuario.belongsToMany(Permissao, {
  through: 'usuario_permissao',
  foreignKey: 'id_usuario',
  otherKey: 'id_permissao',
  as: 'permissao',
});

Permissao.belongsToMany(Usuario, {
  through: 'usuario_permissao',
  foreignKey: 'id_permissao',
  otherKey: 'id_usuario',
  as: 'usuario',
});

// Associações com a tabela 'log_acesso_negado'
Usuario.hasMany(LogAcessoNegado, {
  foreignKey: 'id_usuario',
  as: 'logsAcessoNegado',
});

LogAcessoNegado.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

Permissao.hasMany(LogAcessoNegado, {
  foreignKey: 'id_permissao',
  as: 'logsAcessoNegado',
});

LogAcessoNegado.belongsTo(Permissao, {
  foreignKey: 'id_permissao',
  as: 'permissao',
});

//tabela 'alteracao_permissao'
Usuario.hasMany(AlteracaoPermissao, {
  foreignKey: 'id_usuario',
  as: 'alteracoesPermissao',
});

AlteracaoPermissao.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

Permissao.hasMany(AlteracaoPermissao, {
  foreignKey: 'id_permissao',
  as: 'alteracoesPermissao',
});

AlteracaoPermissao.belongsTo(Permissao, {
  foreignKey: 'id_permissao',
  as: 'permissao',
});


module.exports = {
  Produto,
  Categoria,
  Usuario,
  Estabelecimento,
  Endereco,
  Preco,
  AvaliacaoPreco,
  Ranking,
  Permissao,
  LogAcessoNegado,
  AlteracaoPermissao,
  UsuarioPermissao
};