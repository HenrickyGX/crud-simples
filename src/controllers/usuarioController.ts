const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const usuarioController = {
    criar: async(data:any) => {
        return await prisma.usuarios.create({
            data
        });
    },

    listarTodos: async() => {
        return await prisma.usuarios.findMany();
    },

    listarUm: async (id:string) => {
        return await prisma.usuarios.findUnique({
            where: { id:parseInt(id)},
        });
    },

    editar: async(id:string, data:any) => {
        return await prisma.usuarios.update({
            where: {id: parseInt(id)},
            data
        });
    },

    deletar: async(id:string) =>{
        return await prisma.usuarios.delete({
            where: {id: parseInt(id)}
        });
    }
};
export default usuarioController;
