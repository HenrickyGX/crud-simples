const data = []

function criarRegistro(novoRegistro){
    data.push(novoRegistro);
}
function listarRegistros(){
    return data;

}
function buscarRegistrosPorId(id){
    return data[id];
}
function editarRegistro(id, novosDados){
    data[id] = { ...data[id], ...novosDados};

}
function deletarRegistro(id){
    data.splice(id, 1);

}
module.exports ={
    criarRegistro,
    listarRegistros,
    buscarRegistrosPorId,
    editarRegistro,
    deletarRegistro

}
app.post('/cadastro', (req, res) => {
const novoRegistro = req.body;
registroController.criarRegistro(novoRegistro);
res.status(201).json({ message: 'Registro criado com sucesso' });
});
app.get('/registros', (req, res) => {
const registros = registroController.listarRegistros();
res.json(registros);
});
app.get('/registro/:id', (req, res) => {
const id = req.params.id;
const registro = registroController.buscarRegistroPorId(id);
if (!registro) {
res.status(404).json({ message: 'Registro não encontrado' });
} else {
res.json(registro);
}
});
app.put("/editar/:id", (req, res) => {
  const id = req.params.id;
  const novosDados = req.body;
  if (!registroController.buscarRegistroPorId(id)) {
    res.status(404).json({ message: "Registro não encontrado" });
  } else {
    registroController.editarRegistro(id, novosDados);
    res.json({ message: "Registro editado com sucesso" });
  }
});
app.delete("/deletar/:id", (req, res) => {
  const id = req.params.id;
  if (!registroController.buscarRegistroPorId(id)) {
    res.status(404).json({ message: "Registro não encontrado" });
  } else {
    registroController.deletarRegistro(id);
    res.json({ message: "Registro deletado com sucesso" });
  }
});