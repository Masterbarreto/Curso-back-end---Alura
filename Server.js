import express from "express";

const app = express();

app.listen(3000,() =>{ // usa uma porta de servidor local como o numero 3000
    console.log("Servidor escutando a porta 3000");
});

app.get ("/api", (req, res) =>{
    res.status(200).send("Boas vindas á imersão");
});