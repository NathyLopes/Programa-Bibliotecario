import { connection } from '../configure/db.js'

export async function listarLivros() {
    const [rows] = await connection.query(`
    SELECT * FROM livro
  `)
    return rows
}

export async function cadastrarLivro({ titulo, autor, editora, ano_publicacao, exemplares_totais }) {
    const [result] = await connection.query(
        `
    INSERT INTO livro (titulo, autor, editora, ano_publicacao, exemplares_totais)
    VALUES (?, ?, ?, ?, ?)
    `,
        [titulo, autor, editora, ano_publicacao, exemplares_totais]
    )
    return result.insertId
}

export async function listarLivrosEmprestados() {
    const [rows] = await connection.query(`
    SELECT le.*, l.titulo, a.nome AS aluno
    FROM livro_emprestado le
    JOIN livro l ON le.codigo_livro = l.codigo
    JOIN aluno a ON le.codigo_aluno = a.codigo
  `)
    return rows
}
export async function listarNaoDevolvidos() {
    const [rows] = await connection.query(`
    SELECT le.*, l.titulo, a.nome AS aluno
    FROM livro_emprestado le
    JOIN livro l ON le.codigo_livro = l.codigo
    JOIN aluno a ON le.codigo_aluno = a.codigo
    WHERE le.data_devolucao IS NULL
  `)
    return rows
}

export async function vezesEmprestado(codigoLivro) {
    const [rows] = await connection.query(
        `
    SELECT COUNT(*) AS total
    FROM livro_emprestado
    WHERE codigo_livro = ?
    `,
        [codigoLivro]
    )
    return rows[0].total
}

export async function vezesDevolvido(codigoLivro) {
    const [rows] = await connection.query(
        `
    SELECT COUNT(*) AS total
    FROM livro_emprestado
    WHERE codigo_livro = ? AND data_devolucao IS NOT NULL
    `,
        [codigoLivro]
    )
    return rows[0].total
}

export async function alunosQueMaisLeem() {
    const [rows] = await connection.query(`
    SELECT 
      a.codigo,
      a.nome,
      COUNT(le.codigo) AS total_emprestimos
    FROM aluno a
    LEFT JOIN livro_emprestado le
      ON le.codigo_aluno = a.codigo
    GROUP BY a.codigo, a.nome
    ORDER BY total_emprestimos DESC
  `)
    return rows
}