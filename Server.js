import express from "express";

const posts = [
    {
    id: 1,
    descricao: "Uma foto teste",
    imagem: "https://placecats.com/millie/300/150"
    },
    {
    id: 2,
    descricao: "Gato fazendo yoga",
    imagem: "https://placecats.com/millie/300/150"
    },
    {
    id: 3,
    descricao: "Cachorro brincando",
    imagem: "https://placecats.com/millie/300/150"
    },
    {
    id: 4,
    descricao: "Paisagem montanhosa",
    imagem: "https://placecats.com/millie/300/150"
    },
    {
    id: 5,
    descricao: "Comida deliciosa",
    imagem: "https://placecats.com/millie/300/150"
    }
];

const app = express();
app.use(express.json()); // para trabalhar com json

app.listen(3000,() =>{ // usa uma porta de servidor local como o numero 3000
    console.log("Servidor escutando a porta 3000, acesse a rota http://localhost:3000/posts");
});
app.get ("/posts", (req, res) =>{
    res.status(200).json(posts);
});

function buscarPostPorID(id) {
    return posts.findIndex((posts) => { //entra na array de post
        return posts.id === Number(id);//vai verificar se o id do post é igual ao id que foi passado
    })
}

app.get ("/posts/:id", (req, res) =>{
    const index= buscarPostPorID(req.params.id); //a req tem o valor de id
    res.status(200).json(posts[index]); // eestamos passado a localização do post
});

