import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

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
    app.use(express.json()); // Middleware para permitir requisições JSON

    // Rota para listar os posts
    app.get("/posts", listarPosts);

    // Rota para criar novos posts
    app.post("/posts", postarNovoPost);

    // Rota para upload de imagens
    app.post("/upload", upload.single("imagem"), uploadImagem);
};

export default routes;
