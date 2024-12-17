const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const estabelecimentoRoutes = require('./routes/estabelecimentoRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const precoRoutes = require('./routes/precoRoutes');
const avaliacaoPrecoroutes = require('./routes/avaliacaoPrecoRoutes');
const rankingRoutes = require('./routes/rankingRoutes');
const permissaoRoutes = require('./routes/permissaoRoutes');
const logAcessoNegadoRoutes = require('./routes/logAcessoNegadoRoutes')
const usuarioPermissaoRoutes = require('./routes/usuarioPermissãoRoutes');
const alteraracaoPermissãoRoutes = require('./routes/alteracaoPermissoesRoutes');
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig');

require('dotenv').config();
require('./models')

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/usuario', usuarioRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/produto', produtoRoutes);
app.use('/estabelecimento', estabelecimentoRoutes);
app.use('/endereco', enderecoRoutes);
app.use('/preco', precoRoutes);
app.use('/avaliacao_preco', avaliacaoPrecoroutes);
app.use('/ranking', rankingRoutes);
app.use('/permissao', permissaoRoutes);
app.use('/log_acesso_negado', logAcessoNegadoRoutes);
app.use('/usuariopermissao', usuarioPermissaoRoutes);
app.use('/alterar-permissao', alteraracaoPermissãoRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/', (req, res) => {res.status(200).json({msg: 'bem vindo a api'});});


sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}).catch(error => {
  console.error('Erro ao conectar com o banco de dados:', error);
});
