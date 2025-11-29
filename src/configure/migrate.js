import { connection } from './db.js'

async function migrate() {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS livro (
      codigo INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      autor VARCHAR(255) NOT NULL,
      editora VARCHAR(255),
      ano_publicacao YEAR,
      exemplares_totais INT NOT NULL
    );
  `)

  await connection.query(`
    CREATE TABLE IF NOT EXISTS aluno (
      codigo INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL
    );
  `)

  await connection.query(`
    CREATE TABLE IF NOT EXISTS livro_emprestado (
      codigo INT AUTO_INCREMENT PRIMARY KEY,
      codigo_aluno INT NOT NULL,
      codigo_livro INT NOT NULL,
      data_emprestimo DATE NOT NULL,
      data_devolucao DATE,
      status VARCHAR(50) NOT NULL,
      FOREIGN KEY (codigo_aluno) REFERENCES aluno(codigo),
      FOREIGN KEY (codigo_livro) REFERENCES livro(codigo)
    );
  `)

  console.log('Migração concluída.')
  process.exit(0)
}

async function seedAlunos() {
  await connection.query(`
    INSERT INTO aluno (nome) VALUES
      ('Ana Maria'),
      ('João Pedro'),
      ('Clara Mendes'),
      ('Lucas Ferreira'),
      ('Beatriz Alves')
  `)

  console.log('Alunos inseridos.')
  process.exit(0)
}

seedAlunos()

migrate()