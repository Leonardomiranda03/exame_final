# exame_final

Este projeto é um backend simples desenvolvido com TypeScript para uma loja de pranchas. A aplicação permite o cadastro de pranchas (com atributos como quantidade, tamanho em pés e cor) e a consulta do estoque de pranchas. Foi estruturada utilizando o padrão MVC (Model-View-Controller) e com persistência de dados em um banco de dados PostgreSQL.

## Funcionalidades

- **Cadastro de pranchas**: Permite adicionar uma prancha ao estoque, fornecendo dados como a quantidade, tamanho e cor.
- **Consulta de estoque**: Retorna todas as pranchas cadastradas no banco de dados.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução do JavaScript no servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Express**: Framework minimalista para construção de APIs em Node.js.
- **Sequelize**: ORM (Object-Relational Mapping) para interagir com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado para persistir as informações.
- **dotenv**: Biblioteca para carregar variáveis de ambiente a partir de um arquivo `.env`.

## Estrutura do Projeto

O projeto está organizado de acordo com o padrão **MVC (Model-View-Controller)**, onde:

- **Model**: Contém as definições dos dados (tabelas e regras de negócio).
- **View**: Não utilizada neste projeto, já que o foco é a API (backend).
- **Controller**: Contém a lógica de processamento das rotas.
- **Repository**: Contém a abstração de acesso aos dados.

A estrutura de pastas do projeto é a seguinte:

```
├── src/
│   ├── controllers/       # Contém os controladores de rotas
│   ├── models/            # Contém os modelos de dados (Sequelize)
│   ├── repositories/      # Contém o repositório para abstração de dados
│   ├── config/            # Contém as configurações do banco de dados e servidor
│   ├── routes/            # Contém as rotas da aplicação
│   └── index.ts           # Ponto de entrada da aplicação
├── package.json           # Dependências do projeto
└── README.md              # Documentação do projeto
```

## Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **PostgreSQL** (local ou remoto)

## Instalando o Projeto

### 1. Clonando o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/loja-pranchas.git
cd loja-pranchas
```

### 2. Instalando Dependências

Instale as dependências necessárias utilizando o `npm`:

```bash
npm install
```

### 3. Configuração do Banco de Dados

Você precisa configurar as credenciais do banco de dados no arquivo `.env`. Crie um arquivo `.env` na raiz do projeto com a seguinte estrutura:

```ini
DATABASE_URL=postgres://usuario:senha@host:porta/nome_do_banco
```

- **usuario**: Seu nome de usuário do PostgreSQL.
- **senha**: Sua senha do PostgreSQL.
- **host**: O endereço do banco de dados (ex: `localhost` ou URL fornecida por serviços como Railway ou Render).
- **porta**: A porta do PostgreSQL, normalmente `5432`.
- **nome_do_banco**: O nome do banco de dados que será utilizado.

Exemplo de uma URL completa do PostgreSQL:

```ini
DATABASE_URL=postgres://admin:senha@localhost:5432/loja_pranchas
```

Se você estiver usando serviços como **Railway** ou **Render**, as credenciais do banco de dados serão fornecidas no painel de administração, e você pode adicionar essa URL diretamente ao seu arquivo `.env`.

### 4. Inicializando o Banco de Dados

Caso esteja criando o banco de dados pela primeira vez, você pode rodar as migrações para garantir que as tabelas sejam criadas corretamente. O Sequelize irá sincronizar automaticamente com o banco de dados na primeira vez que você rodar o servidor.

### 5. Executando o Servidor

Agora que tudo está configurado, execute o servidor:

```bash
npm run dev
```

Isso irá iniciar o servidor no `localhost:3000`, e você verá a seguinte saída no console:

```
Conectado ao banco de dados!
Servidor rodando na porta 3000
```

## Como Usar

### 1. **Consulta de Estoque de Pranchas (GET /pranchas)**

Para consultar todas as pranchas cadastradas no estoque, utilize o seguinte comando `curl`:

```bash
curl -X GET http://localhost:3000/pranchas
```

**Exemplo de Resposta**:

```json
[
  {
    "id": 1,
    "quantidade": 10,
    "tamanhoEmPes": 6,
    "cor": "azul"
  },
  {
    "id": 2,
    "quantidade": 5,
    "tamanhoEmPes": 7,
    "cor": "vermelho"
  }
]
```

### 2. **Cadastro de Prancha (POST /pranchas)**

Para cadastrar uma nova prancha, utilize o seguinte comando `curl`, passando os dados de `quantidade`, `tamanhoEmPes` e `cor`:

```bash
curl -X POST http://localhost:3000/pranchas -H "Content-Type: application/json" -d '{"quantidade": 10, "tamanhoEmPes": 6, "cor": "azul"}'
```

**Exemplo de Resposta**:

```json
{
  "message": "Prancha cadastrada com sucesso",
  "prancha": {
    "quantidade": 10,
    "tamanhoEmPes": 6,
    "cor": "azul"
  }
}
```

### 3. **Validações de Entrada**

As entradas para o cadastro de pranchas são validadas. Caso um campo obrigatório esteja faltando, a resposta será um erro com a descrição do que está faltando:

**Exemplo de Erro** (se o campo `tamanhoEmPes` não for enviado):

```json
{
  "error": "O campo tamanhoEmPes é obrigatório"
}
```

## Como Funciona

### 1. **Configuração do Sequelize**

O Sequelize é configurado no arquivo `src/config/database.ts`, onde a URL de conexão ao banco de dados é definida. A conexão é feita utilizando a variável de ambiente `DATABASE_URL`.

### 2. **Modelagem de Dados**

A modelagem dos dados é feita no arquivo `src/models/Prancha.ts`. A tabela `Prancha` possui os seguintes campos:

- **quantidade**: Número inteiro representando a quantidade de pranchas.
- **tamanhoEmPes**: Número inteiro representando o tamanho da prancha em pés.
- **cor**: String representando a cor da prancha.

### 3. **Controllers e Repositórios**

O controlador da rota é responsável por orquestrar as ações para manipular os dados da prancha, enquanto o repositório contém a lógica de interação com o banco de dados (usando o Sequelize).

- **PranchaController**: Contém as funções `getAllPranchas` (para obter todas as pranchas) e `createPrancha` (para criar uma nova prancha).
- **PranchaRepository**: Abstrai a lógica de persistência de dados, interagindo diretamente com o banco.

### 4. **Validação de Dados**

Os dados enviados pelo cliente (como `quantidade`, `tamanhoEmPes` e `cor`) são validados para garantir que estejam completos e corretos. Se os dados estiverem incorretos ou faltando, o servidor retorna um erro com a mensagem apropriada.

## Contribuindo

1. Faça um **fork** do repositório.
2. Crie uma nova **branch** (`git checkout -b feature/nova-funcionalidade`).
3. Faça suas modificações e adicione testes, se necessário.
4. Faça um **commit** das suas alterações (`git commit -am 'Adicionando nova funcionalidade'`).
5. **Push** para o seu repositório (`git push origin feature/nova-funcionalidade`).
6. Abra um **pull request**.


