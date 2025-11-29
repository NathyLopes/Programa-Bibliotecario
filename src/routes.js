import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  listarLivros,
  cadastrarLivro,
  listarLivrosEmprestados,
  listarNaoDevolvidos,
  vezesEmprestado,
  vezesDevolvido,
  alunosQueMaisLeem,
} from './actions/actions.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = Router()
const sendPage = (p) => (req, res) => res.sendFile(path.join(__dirname, 'public', p))

router.get('/', sendPage('index.html'))
router.get('/livros', sendPage('livros.html'))
router.get('/alunos', sendPage('alunos.html'))
router.get('/emprestimos', sendPage('emprestimos.html'))

router.get('/api/livros', async (req, res) => {
  try {
    const rows = await listarLivros()
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/api/livros', async (req, res) => {
  try {
    const id = await cadastrarLivro(req.body)
    res.status(201).json({ insertId: id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/api/emprestados', async (req, res) => {
  try {
    const rows = await listarLivrosEmprestados()
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/api/nao-devolvidos', async (req, res) => {
  try {
    const rows = await listarNaoDevolvidos()
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/api/vezes-emprestado/:codigo', async (req, res) => {
  try {
    const total = await vezesEmprestado(req.params.codigo)
    res.json({ codigo: req.params.codigo, vezes_emprestado: Number(total) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/api/vezes-devolvido/:codigo', async (req, res) => {
  try {
    const total = await vezesDevolvido(req.params.codigo)
    res.json({ codigo: req.params.codigo, vezes_devolvido: Number(total) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/api/alunos/top', async (req, res) => {
  try {
    const rows = await alunosQueMaisLeem()
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router