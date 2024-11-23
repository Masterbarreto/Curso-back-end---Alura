import express from "express";
import multer from "multer";
import corrs from "cors";
import { listarPosts, postarNovoPost, uploadImagem , atualizarNovoPost} from "../controllers/postsController.js";

const corsOptions = {
    origin:"http://localhost:8000",
    optionsSuccessStatus:200
}


// Configuração do armazenamento do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define o diretório de destino dos arquivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Define o nome do arquivo salvo
    }
});

const upload = multer({ storage }); // Corrigido para usar apenas o objeto `storage`

const routes = (app) => {
    app.use(express.json()); 
    app.use(corrs(corsOptions)); 
    // Rota para listar os posts
    app.get("/posts", listarPosts);

    // Rota para criar novos posts
    app.post("/posts", postarNovoPost);

    // Rota para upload de imagens
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;
