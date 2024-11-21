import { getTodosPosts, criarPost } from "../models/postsModels.js";
import fs from "fs";

export async function listarPosts (req, res)
{
    const posts =  await getTodosPosts();
    res.status(200).json(posts);
}

export async function postarNovoPost (req, res){
    const novoPost = req.body; // corpo de requisição
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Erro ao criar post"});
    }
}

export async function uploadImagem(req, res) {
    try {
        // Verifica se o arquivo foi enviado
        if (!req.file) {
            return res.status(400).json({ erro: "Nenhum arquivo enviado." });
        }

        // Cria o objeto do post com os dados do arquivo e corpo da requisição
        const novoPost = {
            descricao: req.body.descricao || "", // Exemplo de campo adicional
            imgUrl: req.file.filename, // Caminho da imagem salva
            alt: req.body.alt || "", // Campo de acessibilidade
        };

        // Salva o post no banco de dados
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);

        res.status(201).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ erro: "Erro ao criar post com imagem" });
    }
}
