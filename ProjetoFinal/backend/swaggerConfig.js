const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Caça Preço',
      version: '1.0.0',
      description: 'API para consultas CRUD.'
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desenvolvimento'
      },
      {
        url: 'https://api.caca-preco.com',
        description: 'Servidor de produção'
      }
    ],
    paths: {
      '/usuario/criar': {
        post: {
          summary: 'Criar um novo usuário',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nome: { type: 'string', description: 'Nome do usuário' },
                    email: { type: 'string', description: 'E-mail do usuário' },
                    senha: { type: 'string', description: 'Senha do usuário' },
                    tipo_usuario: {
                      type: 'string',
                      enum: ['consumidor', 'estabelecimento', 'administrador'],
                      description: 'Tipo de usuário'
                    }
                  },
                  required: ['nome', 'email', 'senha', 'tipo_usuario']
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Usuário criado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id_usuario: { type: 'integer', description: 'ID do usuário' },
                      nome: { type: 'string', description: 'Nome do usuário' },
                      email: { type: 'string', description: 'E-mail do usuário' },
                      tipo_usuario: {
                        type: 'string',
                        description: 'Tipo de usuário'
                      }
                    }
                  }
                }
              }
            },
            500: { description: 'Erro ao criar usuário' }
          }
        }
      },
      '/usuario/login': {
        post: {
          summary: 'Autenticar usuário',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', description: 'E-mail do usuário' },
                    senha: { type: 'string', description: 'Senha do usuário' }
                  },
                  required: ['email', 'senha']
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Usuário autenticado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: { type: 'string', description: 'Token de autenticação' }
                    }
                  }
                }
              }
            },
            401: { description: 'Senha incorreta' },
            404: { description: 'Usuário não encontrado' },
            500: { description: 'Erro ao autenticar' }
          }
        }
      },
      '/usuario/lista': {
        get: {
          summary: 'Listar todos os usuários',
          responses: {
            200: {
              description: 'Lista de usuários',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id_usuario: { type: 'integer', description: 'ID do usuário' },
                        nome: { type: 'string', description: 'Nome do usuário' },
                        email: { type: 'string', description: 'E-mail do usuário' },
                        tipo_usuario: {
                          type: 'string',
                          description: 'Tipo de usuário'
                        }
                      }
                    }
                  }
                }
              }
            },
            500: { description: 'Erro ao listar usuários' }
          }
        }
      },
      '/usuario/{id}': {
        get: {
          summary: 'Buscar usuário por ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
              description: 'ID do usuário'
            }
          ],
          responses: {
            200: {
              description: 'Usuário encontrado',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id_usuario: { type: 'integer', description: 'ID do usuário' },
                      nome: { type: 'string', description: 'Nome do usuário' },
                      email: { type: 'string', description: 'E-mail do usuário' },
                      tipo_usuario: {
                        type: 'string',
                        description: 'Tipo de usuário'
                      }
                    }
                  }
                }
              }
            },
            404: { description: 'Usuário não encontrado' },
            500: { description: 'Erro ao buscar usuário' }
          }
        },
        put: {
          summary: 'Atualizar usuário por ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
              description: 'ID do usuário a ser atualizado'
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nome: { type: 'string', description: 'Novo nome do usuário' },
                    email: { type: 'string', description: 'Novo e-mail do usuário' },
                    senha: { type: 'string', description: 'Nova senha do usuário' },
                    tipo_usuario: {
                      type: 'string',
                      description: 'Novo tipo de usuário'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Usuário atualizado com sucesso' },
            404: { description: 'Usuário não encontrado' },
            500: { description: 'Erro ao atualizar usuário' }
          }
        },
        delete: {
          summary: 'Excluir usuário por ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
              description: 'ID do usuário a ser excluído'
            }
          ],
          responses: {
            200: { description: 'Usuário excluído com sucesso' },
            404: { description: 'Usuário não encontrado' },
            500: { description: 'Erro ao excluir usuário' }
          }
        }
      },
      '/produto/criar': {
        post: {
          summary: 'Criar um novo produto',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nome: { type: 'string', description: 'Nome do produto' },
                    descricao: { type: 'string', description: 'Descrição do produto' },
                    id_categoria: { type: 'integer', description: 'ID da categoria do produto' }
                  },
                  required: ['nome', 'descricao', 'id_categoria']
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Produto criado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', description: 'ID do produto' },
                      nome: { type: 'string', description: 'Nome do produto' },
                      descricao: { type: 'string', description: 'Descrição do produto' },
                      id_categoria: { type: 'integer', description: 'ID da categoria do produto' }
                    }
                  }
                }
              }
            },
            500: { description: 'Erro ao criar produto' }
          }
        }
      },
      '/produto/listar': {
        get: {
          summary: 'Listar todos os produtos',
          responses: {
            200: {
              description: 'Lista de produtos',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer', description: 'ID do produto' },
                        nome: { type: 'string', description: 'Nome do produto' },
                        descricao: { type: 'string', description: 'Descrição do produto' },
                        categoria: {
                          type: 'object',
                          properties: {
                            nome: { type: 'string', description: 'Nome da categoria' }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            500: { description: 'Erro ao listar produtos' }
          }
        }
      },
      '/produto/{id}': {
        get: {
          summary: 'Buscar produto por ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
              description: 'ID do produto'
            }
          ],
          responses: {
            200: {
              description: 'Produto encontrado',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', description: 'ID do produto' },
                      nome: { type: 'string', description: 'Nome do produto' },
                      descricao: { type: 'string', description: 'Descrição do produto' },
                      categoria: {
                        type: 'object',
                        properties: {
                          nome: { type: 'string', description: 'Nome da categoria' }
                        }
                      }
                    }
                  }
                }
              }
            },
            404: { description: 'Produto não encontrado' },
            500: { description: 'Erro ao buscar produto' }
          }
        },
        put: {
          summary: 'Atualizar produto por ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
              description: 'ID do produto a ser atualizado'
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nome: { type: 'string', description: 'Nome do produto' },
                    descricao: { type: 'string', description: 'Descrição do produto' },
                    id_categoria: { type: 'integer', description: 'ID da categoria do produto' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Produto atualizado com sucesso' },
            404: { description: 'Produto não encontrado' },
            500: { description: 'Erro ao atualizar produto' }
          }
        },
        delete: {
          summary: 'Excluir produto por ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
              description: 'ID do produto a ser excluído'
            }
          ],
          responses: {
            200: { description: 'Produto excluído com sucesso' },
            404: { description: 'Produto não encontrado' },
            500: { description: 'Erro ao excluir produto' }
          }
        }
      },
      "/categoria": {
        "post": {
            "summary": "Criar nova categoria",
            "requestBody": {
            "required": true,
            "content": {
                "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                    "nome": {
                        "type": "string",
                        "description": "Nome da categoria"
                    }
                    }
                }
                }
            },
            "responses": {
                "201": {
                "description": "Categoria criada com sucesso",
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "id": {
                            "type": "integer",
                            "description": "ID da categoria"
                        },
                        "nome": {
                            "type": "string",
                            "description": "Nome da categoria"
                        }
                        }
                    }
                    }
                }
                },
                "500": {
                "description": "Erro ao criar categoria"
                }
            }
            }
        },
        "get": {
            "summary": "Listar todas as categorias",
            "responses": {
            "200": {
                "description": "Lista de categorias",
                "content": {
                "application/json": {
                    "schema": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                        "id": {
                            "type": "integer",
                            "description": "ID da categoria"
                        },
                        "nome": {
                            "type": "string",
                            "description": "Nome da categoria"
                        }
                        }
                    }
                    }
                }
                }
            },
            "500": {
                "description": "Erro ao listar categorias"
            }
            }
        }
        },
        "/categoria/{id}": {
        "get": {
            "summary": "Buscar categoria por ID",
            "parameters": [
            {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                "type": "integer"
                },
                "description": "ID da categoria"
            }
            ],
            "responses": {
            "200": {
                "description": "Categoria encontrada",
                "content": {
                "application/json": {
                    "schema": {
                    "type": "object",
                    "properties": {
                        "id": {
                        "type": "integer",
                        "description": "ID da categoria"
                        },
                        "nome": {
                        "type": "string",
                        "description": "Nome da categoria"
                        }
                    }
                    }
                }
                }
            },
            "404": {
                "description": "Categoria não encontrada"
            },
            "500": {
                "description": "Erro ao buscar categoria"
            }
            }
        },
        "put": {
            "summary": "Atualizar categoria por ID",
            "parameters": [
            {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                "type": "integer"
                },
                "description": "ID da categoria a ser atualizada"
            }
            ],
            "requestBody": {
            "required": true,
            "content": {
                "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                    "nome": {
                        "type": "string",
                        "description": "Nome da categoria"
                    }
                    }
                }
                }
            }
            },
            "responses": {
            "200": {
                "description": "Categoria atualizada com sucesso",
                "content": {
                "application/json": {
                    "schema": {
                    "type": "object",
                    "properties": {
                        "id": {
                        "type": "integer",
                        "description": "ID da categoria"
                        },
                        "nome": {
                        "type": "string",
                        "description": "Nome da categoria"
                        }
                    }
                    }
                }
                }
            },
            "404": {
                "description": "Categoria não encontrada"
            },
            "500": {
                "description": "Erro ao atualizar categoria"
            }
            }
        },
        "delete": {
            "summary": "Excluir categoria por ID",
            "parameters": [
            {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                "type": "integer"
                },
                "description": "ID da categoria a ser excluída"
            }
            ],
            "responses": {
            "200": {
                "description": "Categoria excluída com sucesso"
            },
            "404": {
                "description": "Categoria não encontrada"
            },
            "500": {
                "description": "Erro ao excluir categoria"
            }
            }
        }
        },
        "/estabelecimento": {
            "post": {
            "summary": "Criar novo estabelecimento",
            "requestBody": {
                "required": true,
                "content": {
                "application/json": {
                    "schema": {
                    "type": "object",
                    "properties": {
                        "nome_fantasia": {
                        "type": "string",
                        "description": "Nome fantasia do estabelecimento"
                        },
                        "cnpj": {
                        "type": "string",
                        "description": "CNPJ do estabelecimento"
                        },
                        "id_usuario": {
                        "type": "integer",
                        "description": "ID do usuário associado ao estabelecimento"
                        }
                    },
                    "required": ["nome_fantasia", "cnpj", "id_usuario"]
                    }
                }
                },
                "responses": {
                "201": {
                    "description": "Estabelecimento criado com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "id": {
                            "type": "integer",
                            "description": "ID do estabelecimento"
                            },
                            "nome_fantasia": {
                            "type": "string",
                            "description": "Nome fantasia do estabelecimento"
                            },
                            "cnpj": {
                            "type": "string",
                            "description": "CNPJ do estabelecimento"
                            },
                            "id_usuario": {
                            "type": "integer",
                            "description": "ID do usuário associado"
                            }
                        }
                        }
                    }
                    }
                },
                "400": {
                    "description": "Erro de validação de dados"
                },
                "404": {
                    "description": "Usuário não encontrado"
                },
                "500": {
                    "description": "Erro ao criar estabelecimento"
                }
                }
            }
            }
        },
        "/estabelecimento/lista": {
            "get": {
            "summary": "Listar todos os estabelecimentos",
            "responses": {
                "200": {
                "description": "Lista de estabelecimentos",
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "array",
                        "items": {
                        "type": "object",
                        "properties": {
                            "id": {
                            "type": "integer",
                            "description": "ID do estabelecimento"
                            },
                            "nome_fantasia": {
                            "type": "string",
                            "description": "Nome fantasia do estabelecimento"
                            },
                            "cnpj": {
                            "type": "string",
                            "description": "CNPJ do estabelecimento"
                            },
                            "id_usuario": {
                            "type": "integer",
                            "description": "ID do usuário associado"
                            }
                        }
                        }
                    }
                    }
                }
                },
                "500": {
                "description": "Erro ao listar estabelecimentos"
                }
            }
            }
        },
        "/estabelecimento/{id}": {
            "get": {
            "summary": "Buscar estabelecimento por ID",
            "parameters": [
                {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                    "type": "integer"
                },
                "description": "ID do estabelecimento"
                }
            ],
            "responses": {
                "200": {
                "description": "Estabelecimento encontrado",
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "id": {
                            "type": "integer",
                            "description": "ID do estabelecimento"
                        },
                        "nome_fantasia": {
                            "type": "string",
                            "description": "Nome fantasia do estabelecimento"
                        },
                        "cnpj": {
                            "type": "string",
                            "description": "CNPJ do estabelecimento"
                        },
                        "id_usuario": {
                            "type": "integer",
                            "description": "ID do usuário associado"
                        }
                        }
                    }
                    }
                }
                },
                "404": {
                "description": "Estabelecimento não encontrado"
                },
                "500": {
                "description": "Erro ao buscar estabelecimento"
                }
            }
            },
            "put": {
            "summary": "Atualizar estabelecimento por ID",
            "parameters": [
                {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                    "type": "integer"
                },
                "description": "ID do estabelecimento a ser atualizado"
                }
            ],
            "requestBody": {
                "required": true,
                "content": {
                "application/json": {
                    "schema": {
                    "type": "object",
                    "properties": {
                        "nome_fantasia": {
                        "type": "string",
                        "description": "Nome fantasia do estabelecimento"
                        },
                        "cnpj": {
                        "type": "string",
                        "description": "CNPJ do estabelecimento"
                        },
                        "id_usuario": {
                        "type": "integer",
                        "description": "ID do usuário associado ao estabelecimento"
                        }
                    }
                    }
                }
                },
                "responses": {
                "200": {
                    "description": "Estabelecimento atualizado com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "id": {
                            "type": "integer",
                            "description": "ID do estabelecimento"
                            },
                            "nome_fantasia": {
                            "type": "string",
                            "description": "Nome fantasia do estabelecimento"
                            },
                            "cnpj": {
                            "type": "string",
                            "description": "CNPJ do estabelecimento"
                            },
                            "id_usuario": {
                            "type": "integer",
                            "description": "ID do usuário associado"
                            }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Estabelecimento não encontrado"
                },
                "500": {
                    "description": "Erro ao atualizar estabelecimento"
                }
                }
            }
            },
            "delete": {
            "summary": "Excluir estabelecimento por ID",
            "parameters": [
                {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                    "type": "integer"
                },
                "description": "ID do estabelecimento a ser excluído"
                }
            ],
            "responses": {
                "200": {
                "description": "Estabelecimento excluído com sucesso"
                },
                "404": {
                "description": "Estabelecimento não encontrado"
                },
                "500": {
                "description": "Erro ao excluir estabelecimento"
                }
            }
            }
        },
        "/endereco/lista": {
            "get": {
                "summary": "Lista todos os endereços",
                "description": "Retorna todos os endereços cadastrados com detalhes sobre o usuário e o estabelecimento associado.",
                "responses": {
                "200": {
                    "description": "Lista de endereços",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                            "id": {
                                "type": "integer"
                            },
                            "logradouro": {
                                "type": "string"
                            },
                            "numero": {
                                "type": "string"
                            },
                            "complemento": {
                                "type": "string"
                            },
                            "bairro": {
                                "type": "string"
                            },
                            "cidade": {
                                "type": "string"
                            },
                            "estado": {
                                "type": "string"
                            },
                            "cep": {
                                "type": "string"
                            },
                            "usuario": {
                                "type": "object",
                                "properties": {
                                "nome": {
                                    "type": "string"
                                }
                                }
                            },
                            "estabelecimento": {
                                "type": "object",
                                "properties": {
                                "nome_fantasia": {
                                    "type": "string"
                                }
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Erro interno ao listar os endereços"
                }
                }
            }
        },
        "/endereco/{id}": {
            "get": {
                "summary": "Busca um endereço específico pelo ID",
                "description": "Retorna os detalhes de um endereço específico, incluindo informações sobre o usuário e o estabelecimento.",
                "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "ID do endereço a ser consultado",
                    "schema": {
                    "type": "integer"
                    }
                }
                ],
                "responses": {
                "200": {
                    "description": "Endereço encontrado",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "id": {
                            "type": "integer"
                            },
                            "logradouro": {
                            "type": "string"
                            },
                            "numero": {
                            "type": "string"
                            },
                            "complemento": {
                            "type": "string"
                            },
                            "bairro": {
                            "type": "string"
                            },
                            "cidade": {
                            "type": "string"
                            },
                            "estado": {
                            "type": "string"
                            },
                            "cep": {
                            "type": "string"
                            },
                            "usuario": {
                            "type": "object",
                            "properties": {
                                "nome": {
                                "type": "string"
                                }
                            }
                            },
                            "estabelecimento": {
                            "type": "object",
                            "properties": {
                                "nome_fantasia": {
                                "type": "string"
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Endereço não encontrado"
                },
                "500": {
                    "description": "Erro interno ao buscar o endereço"
                }
                }
            },
            "put": {
                "summary": "Atualiza um endereço existente",
                "description": "Atualiza as informações de um endereço específico.",
                "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "ID do endereço a ser atualizado",
                    "schema": {
                    "type": "integer"
                    }
                }
                ],
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "logradouro": {
                            "type": "string"
                        },
                        "numero": {
                            "type": "string"
                        },
                        "complemento": {
                            "type": "string"
                        },
                        "bairro": {
                            "type": "string"
                        },
                        "cidade": {
                            "type": "string"
                        },
                        "estado": {
                            "type": "string"
                        },
                        "cep": {
                            "type": "string"
                        }
                        }
                    }
                    }
                }
                },
                "responses": {
                "200": {
                    "description": "Endereço atualizado com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "id": {
                            "type": "integer"
                            },
                            "logradouro": {
                            "type": "string"
                            },
                            "numero": {
                            "type": "string"
                            },
                            "complemento": {
                            "type": "string"
                            },
                            "bairro": {
                            "type": "string"
                            },
                            "cidade": {
                            "type": "string"
                            },
                            "estado": {
                            "type": "string"
                            },
                            "cep": {
                            "type": "string"
                            }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Endereço não encontrado"
                },
                "500": {
                    "description": "Erro interno ao atualizar o endereço"
                }
                }
            },
            "delete": {
                "summary": "Exclui um endereço",
                "description": "Exclui um endereço específico do banco de dados.",
                "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "ID do endereço a ser excluído",
                    "schema": {
                    "type": "integer"
                    }
                }
                ],
                "responses": {
                "200": {
                    "description": "Endereço excluído com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "message": {
                            "type": "string",
                            "example": "Endereço excluído com sucesso."
                            }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Endereço não encontrado"
                },
                "500": {
                    "description": "Erro interno ao excluir o endereço"
                }
                }
            }
        },
        "/preco/lista": {
            "get": {
                "summary": "Listar todos os preços",
                "operationId": "listarPrecos",
                "responses": {
                "200": {
                    "description": "Lista de preços",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Preco"
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Erro ao listar preços"
                }
                }
            }
        },
        "/preco": {
            "post": {
                "summary": "Criar um novo preço",
                "operationId": "criarPreco",
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/PrecoInput"
                    }
                    }
                }
                },
                "responses": {
                "201": {
                    "description": "Preço criado com sucesso",
                    "content": {
                    "application/json": {
                        "$ref": "#/components/schemas/Preco"
                    }
                    }
                },
                "500": {
                    "description": "Erro ao criar preço"
                }
                }
            }
        },
        "/preco/{id_preco}": {
            "get": {
                "summary": "Buscar preço por ID",
                "operationId": "buscarPrecoPorId",
                "parameters": [
                {
                    "name": "id_preco",
                    "in": "path",
                    "required": true,
                    "schema": {
                    "type": "integer"
                    }
                }
                ],
                "responses": {
                "200": {
                    "description": "Preço encontrado",
                    "content": {
                    "application/json": {
                        "$ref": "#/components/schemas/Preco"
                    }
                    }
                },
                "404": {
                    "description": "Preço não encontrado"
                },
                "500": {
                    "description": "Erro ao buscar preço"
                }
                }
            },
            "put": {
                "summary": "Atualizar preço existente",
                "operationId": "atualizarPreco",
                "parameters": [
                {
                    "name": "id_preco",
                    "in": "path",
                    "required": true,
                    "schema": {
                    "type": "integer"
                    }
                }
                ],
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/PrecoUpdate"
                    }
                    }
                }
                },
                "responses": {
                "200": {
                    "description": "Preço atualizado com sucesso",
                    "content": {
                    "application/json": {
                        "$ref": "#/components/schemas/Preco"
                    }
                    }
                },
                "404": {
                    "description": "Preço não encontrado"
                },
                "500": {
                    "description": "Erro ao atualizar preço"
                }
                }
            },
            "delete": {
                "summary": "Deletar preço existente",
                "operationId": "deletarPreco",
                "parameters": [
                {
                    "name": "id_preco",
                    "in": "path",
                    "required": true,
                    "schema": {
                    "type": "integer"
                    }
                }
                ],
                "responses": {
                "200": {
                    "description": "Preço deletado com sucesso"
                },
                "404": {
                    "description": "Preço não encontrado"
                },
                "500": {
                    "description": "Erro ao deletar preço"
                }
                }
            }
        },
        "/avaliacao_preco": {
            "post": {
                "summary": "Cria uma nova avaliação de preço",
                "tags": ["Avaliação Preço"],
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "id_preco": {
                            "type": "integer"
                        },
                        "id_usuario": {
                            "type": "integer"
                        },
                        "likes": {
                            "type": "integer"
                        }
                        },
                        "required": ["id_preco", "id_usuario", "likes"]
                    }
                    }
                }
                },
                "responses": {
                "201": {
                    "description": "Avaliação criada com sucesso"
                },
                "500": {
                    "description": "Erro ao criar avaliação"
                }
                }
            }
        },
        "/avaliacao_preco/lista": {
            "get": {
                "summary": "Lista todas as avaliações de preço",
                "tags": ["Avaliação Preço"],
                "responses": {
                "200": {
                    "description": "Lista de avaliações",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                            "id_avaliacao": {
                                "type": "integer"
                            },
                            "preco": {
                                "type": "number",
                                "format": "float"
                            },
                            "usuario": {
                                "type": "string"
                            }
                            }
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Erro ao listar avaliações"
                }
                }
            }
        },
        "/avaliacao_preco/{id}": {
            "get": {
                "summary": "Busca uma avaliação de preço por ID",
                "tags": ["Avaliação Preço"],
                "parameters": [
                {
                    "in": "path",
                    "name": "id",
                    "required": true,
                    "schema": {
                    "type": "integer"
                    },
                    "description": "ID da avaliação"
                }
                ],
                "responses": {
                "200": {
                    "description": "Avaliação encontrada",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "id_avaliacao": {
                            "type": "integer"
                            },
                            "preco": {
                            "type": "number",
                            "format": "float"
                            },
                            "usuario": {
                            "type": "string"
                            }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Avaliação não encontrada"
                },
                "500": {
                    "description": "Erro ao buscar avaliação"
                }
                }
            },
            "put": {
                "summary": "Atualiza uma avaliação de preço",
                "tags": ["Avaliação Preço"],
                "parameters": [
                {
                    "in": "path",
                    "name": "id",
                    "required": true,
                    "schema": {
                    "type": "integer"
                    },
                    "description": "ID da avaliação"
                }
                ],
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "likes": {
                            "type": "integer"
                        }
                        }
                    }
                    }
                }
                },
                "responses": {
                "200": {
                    "description": "Avaliação atualizada com sucesso"
                },
                "404": {
                    "description": "Avaliação não encontrada"
                },
                "500": {
                    "description": "Erro ao atualizar avaliação"
                }
                }
            },
            "delete": {
                "summary": "Deleta uma avaliação de preço",
                "tags": ["Avaliação Preço"],
                "parameters": [
                {
                    "in": "path",
                    "name": "id",
                    "required": true,
                    "schema": {
                    "type": "integer"
                    },
                    "description": "ID da avaliação"
                }
                ],
                "responses": {
                "200": {
                    "description": "Avaliação deletada com sucesso"
                },
                "404": {
                    "description": "Avaliação não encontrada"
                },
                "500": {
                    "description": "Erro ao deletar avaliação"
                }
                }
            }
        },
        "/ranking": {
            "get": {
                "summary": "Lista todos os rankings",
                "tags": ["Ranking"],
                "responses": {
                "200": {
                    "description": "Lista de rankings",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                            "id_usuario": {
                                "type": "integer"
                            },
                            "confiabilidade": {
                                "type": "number",
                                "format": "float"
                            },
                            "titulo": {
                                "type": "string"
                            },
                            "usuario": {
                                "type": "object",
                                "properties": {
                                "nome": {
                                    "type": "string"
                                }
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Erro ao listar rankings"
                }
                }
            },
            "post": {
                "summary": "Cria um novo ranking",
                "tags": ["Ranking"],
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "id_usuario": {
                            "type": "integer"
                        },
                        "confiabilidade": {
                            "type": "number",
                            "format": "float"
                        },
                        "titulo": {
                            "type": "string"
                        }
                        },
                        "required": ["id_usuario", "confiabilidade", "titulo"]
                    }
                    }
                }
                },
                "responses": {
                "201": {
                    "description": "Ranking criado com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "id_usuario": {
                            "type": "integer"
                            },
                            "confiabilidade": {
                            "type": "number",
                            "format": "float"
                            },
                            "titulo": {
                            "type": "string"
                            }
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Erro ao criar ranking"
                }
                }
            }
        },
        "/ranking/{id_usuario}": {
            "put": {
                "summary": "Atualiza um ranking existente",
                "tags": ["Ranking"],
                "parameters": [
                {
                    "in": "path",
                    "name": "id_usuario",
                    "required": true,
                    "schema": {
                    "type": "integer"
                    },
                    "description": "ID do usuário que deseja atualizar o ranking"
                }
                ],
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "confiabilidade": {
                            "type": "number",
                            "format": "float"
                        },
                        "titulo": {
                            "type": "string"
                        }
                        }
                    }
                    }
                }
                },
                "responses": {
                "200": {
                    "description": "Ranking atualizado com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "id_usuario": {
                            "type": "integer"
                            },
                            "confiabilidade": {
                            "type": "number",
                            "format": "float"
                            },
                            "titulo": {
                            "type": "string"
                            }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Ranking não encontrado"
                },
                "500": {
                    "description": "Erro ao atualizar ranking"
                }
                }
            },
            "delete": {
                "summary": "Deleta um ranking",
                "tags": ["Ranking"],
                "parameters": [
                {
                    "in": "path",
                    "name": "id_usuario",
                    "required": true,
                    "schema": {
                    "type": "integer"
                    },
                    "description": "ID do usuário que deseja deletar o ranking"
                }
                ],
                "responses": {
                "200": {
                    "description": "Ranking deletado com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "message": {
                            "type": "string"
                            }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Ranking não encontrado"
                },
                "500": {
                    "description": "Erro ao deletar ranking"
                }
                }
            }
        },
        "/permissao/lista": {
            "get": {
                "summary": "Listar todas as permissões",
                "description": "Retorna uma lista com todas as permissões cadastradas no sistema.",
                "responses": {
                "200": {
                    "description": "Lista de permissões",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Permissao"
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Erro ao listar permissões",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "error": {
                            "type": "string",
                            "example": "Erro ao listar permissões: {message}"
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
        },
        "/permissao": {
            "post": {
                "summary": "Criar uma nova permissão",
                "description": "Cria uma nova permissão com nome e descrição.",
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/Permissao"
                    }
                    }
                }
                },
                "responses": {
                "201": {
                    "description": "Permissão criada com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/Permissao"
                        }
                    }
                    }
                },
                "500": {
                    "description": "Erro ao criar permissão",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "error": {
                            "type": "string",
                            "example": "Erro ao criar permissão: {message}"
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
        },
        "/permissao/criar-em-lote": {
            "post": {
                "summary": "Criar permissões em lote",
                "description": "Cria múltiplas permissões a partir de um array de objetos de permissões.",
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "array",
                        "items": {
                        "$ref": "#/components/schemas/Permissao"
                        }
                    }
                    }
                }
                },
                "responses": {
                "201": {
                    "description": "Permissões criadas com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Permissao"
                        }
                        }
                    }
                    }
                },
                "400": {
                    "description": "Formato inválido",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "error": {
                            "type": "string",
                            "example": "Formato inválido! Envie um array de permissões."
                            }
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Erro ao criar permissões",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "error": {
                            "type": "string",
                            "example": "Erro ao criar permissões: {message}"
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
        },
        "/permissao/{id_permissao}": {
            "put": {
                "summary": "Atualizar uma permissão existente",
                "description": "Atualiza uma permissão com base no ID fornecido.",
                "parameters": [
                {
                    "name": "id_permissao",
                    "in": "path",
                    "required": true,
                    "description": "ID da permissão a ser atualizada",
                    "schema": {
                    "type": "integer"
                    }
                }
                ],
                "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/Permissao"
                    }
                    }
                }
                },
                "responses": {
                "200": {
                    "description": "Permissão atualizada com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/Permissao"
                        }
                    }
                    }
                },
                "404": {
                    "description": "Permissão não encontrada",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "error": {
                            "type": "string",
                            "example": "Permissão não encontrada"
                            }
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Erro ao atualizar permissão",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "error": {
                            "type": "string",
                            "example": "Erro ao atualizar permissão: {message}"
                            }
                        }
                        }
                    }
                    }
                }
                }
            },
            "delete": {
                "summary": "Deletar uma permissão",
                "description": "Deleta uma permissão com base no ID fornecido.",
                "parameters": [
                {
                    "name": "id_permissao",
                    "in": "path",
                    "required": true,
                    "description": "ID da permissão a ser deletada",
                    "schema": {
                    "type": "integer"
                    }
                }
                ],
                "responses": {
                "200": {
                    "description": "Permissão deletada com sucesso",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "message": {
                            "type": "string",
                            "example": "Permissão deletada com sucesso"
                            }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Permissão não encontrada",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "error": {
                            "type": "string",
                            "example": "Permissão não encontrada"
                            }
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Erro ao deletar permissão",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "object",
                        "properties": {
                            "error": {
                            "type": "string",
                            "example": "Erro ao deletar permissão: {message}"
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
        },
        "/log_acesso_negado": {
            "post": {
                "summary": "Criação de um novo log de acesso negado",
                "description": "Cria um log de acesso negado com informações sobre o usuário, permissão e a mensagem associada.",
                "parameters": [
                {
                    "name": "id_usuario",
                    "in": "body",
                    "description": "ID do usuário relacionado ao log de acesso negado.",
                    "required": true,
                    "schema": {
                    "type": "integer"
                    }
                },
                {
                    "name": "id_permissao",
                    "in": "body",
                    "description": "ID da permissão associada ao log de acesso negado.",
                    "required": true,
                    "schema": {
                    "type": "integer"
                    }
                },
                {
                    "name": "mensagem",
                    "in": "body",
                    "description": "Mensagem associada ao log de acesso negado.",
                    "required": true,
                    "schema": {
                    "type": "string"
                    }
                }
                ],
                "responses": {
                "201": {
                    "description": "Log de acesso negado criado com sucesso.",
                    "schema": {
                    "$ref": "#/definitions/LogAcessoNegado"
                    }
                },
                "404": {
                    "description": "Usuário ou permissão não encontrados."
                },
                "500": {
                    "description": "Erro interno ao criar o log de acesso negado."
                }
                }
            },
            "get": {
                "summary": "Busca todos os logs de acesso negado",
                "description": "Retorna todos os logs de acesso negado com as informações de usuário e permissão.",
                "responses": {
                "200": {
                    "description": "Logs de acesso negado encontrados.",
                    "schema": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/LogAcessoNegado"
                    }
                    }
                },
                "500": {
                    "description": "Erro interno ao buscar os logs."
                }
                }
            }
        },
        "/log_acesso_negado/{id_log}": {
            "get": {
                "summary": "Busca um log de acesso negado específico",
                "description": "Retorna um log de acesso negado específico, identificado pelo ID.",
                "parameters": [
                {
                    "name": "id_log",
                    "in": "path",
                    "description": "ID do log de acesso negado.",
                    "required": true,
                    "type": "integer"
                }
                ],
                "responses": {
                "200": {
                    "description": "Log de acesso negado encontrado.",
                    "schema": {
                    "$ref": "#/definitions/LogAcessoNegado"
                    }
                },
                "404": {
                    "description": "Log de acesso negado não encontrado."
                },
                "500": {
                    "description": "Erro interno ao buscar o log de acesso negado."
                }
                }
            },
            "delete": {
                "summary": "Exclui um log de acesso negado específico",
                "description": "Exclui um log de acesso negado identificado pelo ID.",
                "parameters": [
                {
                    "name": "id_log",
                    "in": "path",
                    "description": "ID do log de acesso negado.",
                    "required": true,
                    "type": "integer"
                }
                ],
                "responses": {
                "204": {
                    "description": "Log de acesso negado excluído com sucesso."
                },
                "404": {
                    "description": "Log de acesso negado não encontrado."
                },
                "500": {
                    "description": "Erro interno ao excluir o log de acesso negado."
                }
                }
            }
        },
        "/usuariopermissao": {
            "post": {
                "summary": "Adicionar permissão ao usuário",
                "description": "Adiciona uma permissão específica a um usuário. Se a relação já existir, não será criada novamente.",
                "parameters": [
                {
                    "name": "id_usuario",
                    "in": "body",
                    "description": "ID do usuário ao qual a permissão será atribuída.",
                    "required": true,
                    "schema": {
                    "type": "integer"
                    }
                },
                {
                    "name": "id_permissao",
                    "in": "body",
                    "description": "ID da permissão que será atribuída ao usuário.",
                    "required": true,
                    "schema": {
                    "type": "integer"
                    }
                }
                ],
                "responses": {
                "201": {
                    "description": "Permissão adicionada com sucesso.",
                    "schema": {
                    "$ref": "#/definitions/RespostaPermissaoUsuario"
                    }
                },
                "400": {
                    "description": "Dados faltando ou relação de permissão já existente."
                },
                "404": {
                    "description": "Usuário ou permissão não encontrados."
                },
                "500": {
                    "description": "Erro interno ao adicionar permissão."
                }
                }
            }
        },
        "/usuariopermissao/remover/{id_usuario}/{id_permissao}": {
            "delete": {
                "summary": "Remover permissão do usuário",
                "description": "Remove a permissão associada ao usuário identificado pelo ID.",
                "parameters": [
                {
                    "name": "id_usuario",
                    "in": "path",
                    "description": "ID do usuário do qual a permissão será removida.",
                    "required": true,
                    "type": "integer"
                },
                {
                    "name": "id_permissao",
                    "in": "path",
                    "description": "ID da permissão a ser removida do usuário.",
                    "required": true,
                    "type": "integer"
                }
                ],
                "responses": {
                "200": {
                    "description": "Permissão removida com sucesso."
                },
                "404": {
                    "description": "Associação de permissão não encontrada."
                },
                "500": {
                    "description": "Erro interno ao remover permissão."
                }
                }
            }
        },
        "/usuariopermissao/{id_usuario}": {
            "get": {
                "summary": "Listar permissões de um usuário",
                "description": "Retorna todas as permissões associadas a um usuário específico.",
                "parameters": [
                {
                    "name": "id_usuario",
                    "in": "path",
                    "description": "ID do usuário cujas permissões serão listadas.",
                    "required": true,
                    "type": "integer"
                }
                ],
                "responses": {
                "200": {
                    "description": "Permissões do usuário listadas com sucesso.",
                    "schema": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/PermissaoUsuario"
                    }
                    }
                },
                "404": {
                    "description": "Nenhuma permissão encontrada para o usuário."
                },
                "500": {
                    "description": "Erro interno ao listar permissões."
                }
                }
            }
        },
        "/usuariopermissao/lista": {
            "get": {
                "summary": "Listar todas as permissões",
                "description": "Retorna uma lista de todas as permissões disponíveis no sistema.",
                "responses": {
                "200": {
                    "description": "Permissões listadas com sucesso.",
                    "schema": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Permissao"
                    }
                    }
                },
                "404": {
                    "description": "Nenhuma permissão encontrada."
                },
                "500": {
                    "description": "Erro interno ao listar permissões."
                }
                }
            }
        },
        "/alterar-permissao": {
            "post": {
                "summary": "Criar Alteração de Permissão",
                "operationId": "criarAlteracaoPermissao",
                "requestBody": {
                "description": "Dados para criar a alteração de permissão.",
                "required": true,
                "content": {
                    "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "id_usuario": {
                            "type": "integer",
                            "description": "ID do usuário."
                        },
                        "id_permissao": {
                            "type": "integer",
                            "description": "ID da permissão."
                        },
                        "acao": {
                            "type": "string",
                            "description": "Ação realizada (ex: 'adicionar', 'remover')."
                        }
                        },
                        "required": ["id_usuario", "id_permissao", "acao"]
                    }
                    }
                }
                },
                "responses": {
                "201": {
                    "description": "Alteração de permissão criada com sucesso.",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/AlteracaoPermissao"
                        }
                    }
                    }
                },
                "400": {
                    "description": "Dados inválidos."
                },
                "404": {
                    "description": "Usuário ou permissão não encontrados."
                },
                "500": {
                    "description": "Erro interno do servidor."
                }
                }
            }
        },
        "/alterar-permissao/usuario/{id_usuario}": {
            "get": {
                "summary": "Listar Alterações de Permissão por Usuário",
                "operationId": "listarAlteracoesPorUsuario",
                "parameters": [
                {
                    "name": "id_usuario",
                    "in": "path",
                    "required": true,
                    "description": "ID do usuário",
                    "schema": {
                    "type": "integer"
                    }
                }
                ],
                "responses": {
                "200": {
                    "description": "Lista de alterações de permissão para o usuário.",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/AlteracaoPermissao"
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Nenhuma alteração encontrada para este usuário."
                },
                "500": {
                    "description": "Erro interno do servidor."
                }
                }
            }
        },
        "/alterar-permissao/permissao/{id_permissao}": {
            "get": {
                "summary": "Listar Alterações de Permissão por Permissão",
                "operationId": "listarAlteracoesPorPermissao",
                "parameters": [
                {
                    "name": "id_permissao",
                    "in": "path",
                    "required": true,
                    "description": "ID da permissão",
                    "schema": {
                    "type": "integer"
                    }
                }
                ],
                "responses": {
                "200": {
                    "description": "Lista de alterações de permissão para a permissão especificada.",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/AlteracaoPermissao"
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Nenhuma alteração encontrada para esta permissão."
                },
                "500": {
                    "description": "Erro interno do servidor."
                }
                }
            }
        },
        "/alterar-permissao": {
            "get": {
                "summary": "Listar todas as Alterações de Permissão",
                "operationId": "listarAlteracoes",
                "responses": {
                "200": {
                    "description": "Lista de todas as alterações de permissão.",
                    "content": {
                    "application/json": {
                        "schema": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/AlteracaoPermissao"
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Erro interno do servidor."
                }
                }
            }
        },
        "/alterar-permissao/{id_alteracao}": {
            "delete": {
                "summary": "Deletar Alteração de Permissão",
                "operationId": "deletarAlteracaoPermissao",
                "parameters": [
                {
                    "name": "id_alteracao",
                    "in": "path",
                    "required": true,
                    "description": "ID da alteração de permissão",
                    "schema": {
                    "type": "integer"
                    }
                }
                ],
                "responses": {
                "200": {
                    "description": "Alteração de permissão deletada com sucesso."
                },
                "404": {
                    "description": "Alteração de permissão não encontrada."
                },
                "500": {
                    "description": "Erro interno do servidor."
                }
                }
            }
        }
        },
        "components": {
            "schemas": {
            "AlteracaoPermissao": {
                "type": "object",
                "properties": {
                "id_alteracao": {
                    "type": "integer",
                    "description": "ID da alteração de permissão"
                },
                "id_usuario": {
                    "type": "integer",
                    "description": "ID do usuário"
                },
                "id_permissao": {
                    "type": "integer",
                    "description": "ID da permissão"
                },
                "acao": {
                    "type": "string",
                    "description": "Ação realizada (ex: 'adicionar', 'remover')"
                },
                "usuario": {
                    "$ref": "#/components/schemas/Usuario"
                },
                "permissao": {
                    "$ref": "#/components/schemas/Permissao"
                }
                }
            },
            "Usuario": {
                "type": "object",
                "properties": {
                "id_usuario": {
                    "type": "integer",
                    "description": "ID do usuário"
                },
                "nome": {
                    "type": "string",
                    "description": "Nome do usuário"
                }
                }
            },
            "Permissao": {
                "type": "object",
                "properties": {
                "id_permissao": {
                    "type": "integer",
                    "description": "ID da permissão"
                },
                "descricao": {
                    "type": "string",
                    "description": "Descrição da permissão"
                }
                }
            }
            }
        },
        "definitions": {
            "RespostaPermissaoUsuario": {
            "type": "object",
            "properties": {
                "message": {
                "type": "string",
                "description": "Mensagem de resposta"
                },
                "novaPermissaoUsuario": {
                "$ref": "#/definitions/PermissaoUsuario"
                }
            }
            },
            "PermissaoUsuario": {
            "type": "object",
            "properties": {
                "id_usuario": {
                "type": "integer",
                "description": "ID do usuário"
                },
                "id_permissao": {
                "type": "integer",
                "description": "ID da permissão"
                }
            }
            },
            "Permissao": {
            "type": "object",
            "properties": {
                "id": {
                "type": "integer",
                "description": "ID da permissão"
                },
                "nome": {
                "type": "string",
                "description": "Nome da permissão"
                }
            }
            }
        },
        "definitions": {
            "LogAcessoNegado": {
            "type": "object",
            "properties": {
                "id": {
                "type": "integer",
                "description": "ID do log de acesso negado"
                },
                "id_usuario": {
                "type": "integer",
                "description": "ID do usuário associado ao log de acesso negado"
                },
                "id_permissao": {
                "type": "integer",
                "description": "ID da permissão associada ao log de acesso negado"
                },
                "mensagem": {
                "type": "string",
                "description": "Mensagem associada ao log de acesso negado"
                },
                "usuario": {
                "$ref": "#/definitions/Usuario"
                },
                "permissao": {
                "$ref": "#/definitions/Permissao"
                }
            }
            },
            "Usuario": {
            "type": "object",
            "properties": {
                "id": {
                "type": "integer",
                "description": "ID do usuário"
                },
                "nome": {
                "type": "string",
                "description": "Nome do usuário"
                },
                "email": {
                "type": "string",
                "description": "Email do usuário"
                }
            }
            },
            "Permissao": {
            "type": "object",
            "properties": {
                "id": {
                "type": "integer",
                "description": "ID da permissão"
                },
                "nome": {
                "type": "string",
                "description": "Nome da permissão"
                }
            }
            }
        },
        "components": {
            "schemas": {
            "Permissao": {
                "type": "object",
                "properties": {
                "id": {
                    "type": "integer",
                    "description": "ID único da permissão"
                },
                "nome": {
                    "type": "string",
                    "description": "Nome da permissão"
                },
                "descricao": {
                    "type": "string",
                    "description": "Descrição da permissão"
                }
                },
                "required": [
                "nome",
                "descricao"
                ]
            }
            }
        },
        "components": {
            "schemas": {
            "Preco": {
                "type": "object",
                "properties": {
                "id_preco": {
                    "type": "integer"
                },
                "id_produto": {
                    "type": "integer"
                },
                "id_estabelecimento": {
                    "type": "integer"
                },
                "preco": {
                    "type": "number",
                    "format": "float"
                },
                "id_usuario": {
                    "type": "integer"
                },
                "confiabilidade": {
                    "type": "number",
                    "format": "float"
                },
                "produto": {
                    "type": "object",
                    "properties": {
                    "nome": {
                        "type": "string"
                    }
                    }
                },
                "estabelecimento": {
                    "type": "object",
                    "properties": {
                    "nome_fantasia": {
                        "type": "string"
                    }
                    }
                },
                "usuario": {
                    "type": "object",
                    "properties": {
                    "nome": {
                        "type": "string"
                    }
                    }
                }
                }
            },
            "PrecoInput": {
                "type": "object",
                "properties": {
                "id_produto": {
                    "type": "integer"
                },
                "id_estabelecimento": {
                    "type": "integer"
                },
                "preco": {
                    "type": "number",
                    "format": "float"
                },
                "id_usuario": {
                    "type": "integer"
                },
                "confiabilidade": {
                    "type": "number",
                    "format": "float"
                }
                },
                "required": [
                "id_produto",
                "id_estabelecimento",
                "preco",
                "id_usuario",
                "confiabilidade"
                ]
            },
            "PrecoUpdate": {
                "type": "object",
                "properties": {
                "preco": {
                    "type": "number",
                    "format": "float"
                },
                "confiabilidade": {
                    "type": "number",
                    "format": "float"
                }
                }
            }
        }

        }

  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = swaggerDocs;
