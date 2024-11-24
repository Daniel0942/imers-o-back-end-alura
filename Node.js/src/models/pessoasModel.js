import 'dotenv/config'
import { ObjectId } from "mongodb"
import conectarAoBanco from "../config/dbConfig.js"

let conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

// função assíncrona pra buscar todas as pessoas da coleção (tabela) do database
export async function getTodasPessoas() {
    let db = conexao.db("imersao-alura")
    let colecao = db.collection("pessoas")
    return colecao.find().toArray()
}
// função assíncrona pra inserir pessoa na coleção da database
export async function InserirPessoa(pessoa) {
    let db = conexao.db("imersao-alura")
    let colecao = db.collection("pessoas")
    return colecao.insertOne(pessoa)
}

export async function atualizarNovaPessoa(id, pessoaAtualizada) {
    let db = conexao.db("imersao-alura")
    let colecao = db.collection("pessoas")
    let objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:pessoaAtualizada})
} 