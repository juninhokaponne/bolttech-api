
# Todo-API

Este desafio envolve a criação de um aplicativo web gerenciador de tarefas multiusuário.







## Rodando localmente

Clone o projeto

```bash
  git clone https://link-para-o-projeto
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Criar o arquivo .env na raiz do seu projeto 

Rodar o comando para criar seu banco de dados

```bash
  npx sequelize-cli db:create
```

e depois este, para rodar todas migrations

```bash
  npx sequelize-cli db:migrate
```

Inicie o servidor

```bash
  npm run dev
```

Pode ser que seja necessário sincronizar as informações das models, 
caso seja necessário basta rodar o comando.

```bash
  NomeDaModel.sync({ force: true });
```


## Stack utilizada

**Back-end:** Node, Express  


## Licença

[MIT](https://choosealicense.com/licenses/mit/)


