# Como executar o projeto

## Instalar as dependências

```bash
npm install

```

## Criar tabelas no banco de dados

```bash
npm run migrate

```

## Rodar projeto

```bash
npm run dev

```

## env
Para ter conexão com o banco de dados crie um arquivo `.env`:

 ```
 DB_HOST=
 DB_USER=
 DB_PASSWORD=
 DB_NAME=
 
 ```

# Funcionalidades

- Listar Livros Cadastrados 
- Cadastrar Livros
- Relatorio de Livros Emprestados 
- Listar os Livros que foram emprestados
- Listar livros que ainda não foram devolvidos
- Listar quantas vezes um livro foi emprestado
- Lista quantas vezes ele foi devolvido
- Listar os Alunos que mais leem livros 



# Entidades:
*livro*
- codigo
- titulo
- autor
- editora
- ano publicação  
- exemplares totais

*aluno*
- codigo
- nome

*livro_emprestado*
- codigo
- codigo_aluno
- codigo_livro
- data_emprestimo
- data_devolução
- status 
