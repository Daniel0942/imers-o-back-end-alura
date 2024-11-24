import { getTodasPessoas, InserirPessoa, atualizarNovaPessoa } from "../models/pessoasModel.js"
import fs from "fs"
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPessoas(req, res) {
    let pessoas = await getTodasPessoas()
    res.status(200).json(pessoas)
}

export async function inserirNovaPessoa(req, res){
    let novaPessoa = req.body
    try {
        let pessoaCriada = await InserirPessoa(novaPessoa)
        res.status(200).json(pessoaCriada)
    } catch(error) {
        console.error(error.message)
        res.status(500).json({"Erro": "falha na requisição!"})
    }
}

export async function uploadImagem(req, res){
    let novaURL = {
        nome: "",
        idade: "",
        genero: "",
        imgUrl: req.file.originalname,
        descricao: "",
        alt: ""
    }
    try {
        let post = await InserirPessoa(novaURL)
        let imagemAtualizada = `uploads/${post.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada) // pra renomear com o id
        res.status(200).json(post)
    } catch(error) {
        console.error(error.message)
        res.status(500).json({"Erro": "falha na requisição!"})
    }
}

export async function atualizarPessoa(req, res){
    let id  = req.params.id
    let urlImagem = `http://localhost:3000/${id}.png`

    try {
        let imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        let descricao = await gerarDescricaoComGemini(imgBuffer)
        
        let pessoaAtualizada = {
            nome: req.body.nome,
            idade: req.body.idade,
            genero: req.body.genero,
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        let pessoaEdit = await atualizarNovaPessoa(id, pessoaAtualizada)
        res.status(200).json(pessoaEdit)
    } catch(error) {
        console.error(error.message)
        res.status(500).json({"Erro": "falha na requisição!"})
    }
}