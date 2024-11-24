import express from "express"
import { inserirNovaPessoa, listarPessoas, uploadImagem,  atualizarPessoa } from "../controllers/pessoasController.js"
import multer from "multer"
import cors from "cors"

let corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// código para windows, se for linux ou mac, não precisa, somente a "const upload sem o storage"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ dest: "./uploads" , storage})

let routes = (app) => {
    // Permite que o servidor interprete requisições com o json
    app.use(express.json())
    app.use(cors(corsOptions))
    // definindo a rota de listagem de pessoas
    app.get("/pessoas", listarPessoas)

    // definindo a rota post 
    app.post("/pessoas", inserirNovaPessoa)

    // definindo a rota de upload de imagens
    app.post("/upload", upload.single("imagem"), uploadImagem)

    // definindo a rota para atualizar pessoa
    app.put("/upload/:id", atualizarPessoa)
}

export default routes 