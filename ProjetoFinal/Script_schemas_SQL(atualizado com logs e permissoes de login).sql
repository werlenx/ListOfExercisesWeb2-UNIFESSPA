-- Tipo ENUM para os tipos de usuários
CREATE TYPE tipo_usuario_enum AS ENUM ('consumidor', 'estabelecimento', 'administrador');
CREATE TYPE titulo_enum AS ENUM ('iniciante', 'avaliador', 'expert', 'mestre');

-- Criando a tabela usuario
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario tipo_usuario_enum NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criando a tabela categoria
CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL
);

-- Criando a tabela produto
CREATE TABLE produto (
    id_produto SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    id_categoria INTEGER REFERENCES categoria(id_categoria) ON DELETE SET NULL
);

-- Criando a tabela estabelecimento
CREATE TABLE estabelecimento (
    id_estabelecimento SERIAL PRIMARY KEY,
    nome_fantasia VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    id_usuario INTEGER UNIQUE REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criando a tabela endereco
CREATE TABLE endereco (
    id_endereco SERIAL PRIMARY KEY,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(20),
    complemento VARCHAR(255),
    bairro VARCHAR(100),
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    cep VARCHAR(20) NOT NULL,
    id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    id_estabelecimento INTEGER REFERENCES estabelecimento(id_estabelecimento) ON DELETE CASCADE,
    CHECK (
        (id_usuario IS NOT NULL AND id_estabelecimento IS NULL) OR
        (id_usuario IS NULL AND id_estabelecimento IS NOT NULL)
    )
);

-- Criando a tabela preco
CREATE TABLE preco (
    id_preco SERIAL PRIMARY KEY,
    id_produto INTEGER REFERENCES produto(id_produto) ON DELETE CASCADE,
    id_estabelecimento INTEGER REFERENCES estabelecimento(id_estabelecimento) ON DELETE CASCADE,
    preco DECIMAL(10, 2) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    confiabilidade DECIMAL(5, 2) DEFAULT 0 
);

-- Criando a tabela avaliacao_preco
CREATE TABLE avaliacao_preco (
    id_avaliacao SERIAL PRIMARY KEY,
    id_preco INTEGER REFERENCES preco(id_preco) ON DELETE CASCADE,
    id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    likes BOOLEAN NOT NULL,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criando a tabela ranking
CREATE TABLE ranking (
    id_usuario INTEGER PRIMARY KEY REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    confiabilidade DECIMAL(5, 2) DEFAULT 0,
    titulo titulo_enum NOT NULL
);

-- Criando a tabela permissao
CREATE TABLE permissao (
    id_permissao SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL, -- Nome da permissão (ex.: "cadastrar_produto", "avaliar_preco")
    descricao TEXT
);

-- Criando a tabela usuario_permissao
CREATE TABLE usuario_permissao (
    id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    id_permissao INTEGER REFERENCES permissao(id_permissao) ON DELETE CASCADE,
    PRIMARY KEY (id_usuario, id_permissao)
);

-- Criando a tabela logs de tentativas de acesso negadas
CREATE TABLE log_acesso_negado (
    id_log SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    id_permissao INTEGER REFERENCES permissao(id_permissao) ON DELETE CASCADE,
    data_tentativa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mensagem TEXT NOT NULL
);

-- Atualizando permissões em tempo real: Criando trigger para revogação/atualização
-- Tabela auxiliar para acompanhar mudanças em permissões (opcional, para auditoria)
CREATE TABLE alteracao_permissao (
    id_alteracao SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    id_permissao INTEGER REFERENCES permissao(id_permissao) ON DELETE CASCADE,
    acao VARCHAR(50) NOT NULL CHECK (acao IN ('adicionar', 'remover')),
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criando uma trigger para registrar alterações em permissões
CREATE OR REPLACE FUNCTION registrar_alteracao_permissao()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO alteracao_permissao (id_usuario, id_permissao, acao, data_alteracao)
        VALUES (NEW.id_usuario, NEW.id_permissao, 'adicionar', CURRENT_TIMESTAMP);
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO alteracao_permissao (id_usuario, id_permissao, acao, data_alteracao)
        VALUES (OLD.id_usuario, OLD.id_permissao, 'remover', CURRENT_TIMESTAMP);
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Associando a trigger à tabela usuario_permissao
CREATE TRIGGER trg_alteracao_permissao
AFTER INSERT OR DELETE ON usuario_permissao
FOR EACH ROW EXECUTE FUNCTION registrar_alteracao_permissao();
