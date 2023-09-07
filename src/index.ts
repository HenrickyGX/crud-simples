import express, { Request, Response } from "express";
import usuarioController from "./controllers/usuarioController";
const app = express();
app.use(express.json());
const PORT = 3000;
app.post("/usuarios", (req: Request, res: Response) => {
  usuarioController
    .criar(req.body)
    .then((result: any) => res.json(result))
    .catch((error: any) => res.status(400).json(error));
});
app.get("/usuarios", (_req, res) => {
  usuarioController
    .listarTodos()
    .then((result: any) => res.json(result))
    .catch((error: any) => res.status(400).json(error));
});
app.get("/usuarios/:id", (req, res) => {
  usuarioController
    .listarUm(req.params.id)
    .then((result: any) => res.json(result))
    .catch((error: any) => res.status(400).json(error));
});
app.put("/usuarios/:id", (req, res) => {
  usuarioController
    .editar(req.params.id, req.body)
    .then((result: any) => res.json(result))
    .catch((error: any) => res.status(400).json(error));
});
app.delete("/usuarios/:id", (req, res) => {
  usuarioController
    .deletar(req.params.id)
    .then((result: any) => res.json(result))
    .catch((error: any) => res.status(400).json(error));
});
app.listen(PORT, () => {
  console.log(`servidor rodando na porta = ${PORT}`);
});
