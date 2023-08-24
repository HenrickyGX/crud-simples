// Importar express, que é a biblioteca da api

const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

let data = [];

app.post("/cadastro", (req, res) => {
  const novoRegistro = req.body;
  data.push(novoRegistro);
  res.status(201).json({ message: "Registro criado com Sucesso!!" });
});

app.get('/listar', (req, res) =>{
    res.status(200).json({mensagem: "Aqui vai os respectivos dados!",data});
});

app.get('/listar/:usuarioId', (req, res) =>{
    //caputura da id do usuario vindo da requisição
    const {usuarioId} = req.params
    //busca em 'data' em um usuario cujo id é usuarioId
    const usuario = data.find(usuario => usuario.id===Number(usuarioId))
    //verificação se existe o usuario 
    if(usuario){
        //retorna usuario
        return res.status(200).json({mensagem: "usuario encontrado", usuario})

    }
    // em qualquer outro caso, retorna o codigo 401 e dizendo usuario nao encontrado
    return res.status(401).json({mensagem: "usuario nao encontrado"})
});

app.put('/editar/:usuarioId', (req, res) => {
    const {usuarioId} = req.params;
    const {nome,telefone} = req.body;
    const usuario = data.find(usuario => usuario.id===Number(usuarioId))
    if(usuario){
        data = data.map(usuario => {
            if (usuario.id === Number(usuarioId)){
                return {...usuario,nome,telefone}
            }
            return usuario
        })
        req.status(200).json({ mensagem: "alterado com sucesso", data });
    }
    req.status(401).json({ mensagem: "usuario nao encontrado" });
})

// app.delete('/deletar/:usuarioId', (req, res) =>{
//     const usuarioId = req.params.usuarioId;


// })

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

