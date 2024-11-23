import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

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
            imgUrl: req.file.filename, // Caminho da imagem salva
            descricao: req.body.descricao || "", // Exemplo de campo adicional
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

export async function  atualizarNovoPost (req, res){
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post); //passa dois argumentos o id e o postAtualizado
        res.status(200).json(postCriado); 
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

