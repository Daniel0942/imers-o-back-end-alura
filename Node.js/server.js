import express from "express"
import routes from "./src/routes/pessoasRoutes.js"

let app = express()
routes(app)
app.use(express.static("uploads")) //Para servir arquivos estáticos

// Inicializando o servidor na porta 3000
app.listen(3000, ()=>{
    console.log("Abrindo servidor...")
})