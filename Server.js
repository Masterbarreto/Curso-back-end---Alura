import express from "express";
import routes from "./src/routes/postsRoutes.js"; // importa as rotas do arquivo routes.js

const app = express();

routes (app)

app.listen(3000,() =>{ // usa uma porta de servidor local como o numero 3000
    console.log("Servidor escutando a porta 3000, acesse a rota http://localhost:3000/posts");
});


