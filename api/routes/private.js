import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.get('/listar-usuarios', async (req, res)=>{

    try{
        //proucra todos os usuarios
        const users = await prisma.user.findMany()

        res.status(200).json({message: 'usuarios listado com sucesso', users})

    }catch(err){
        res.status(500).json({ message: "erro no servidor tente novamente" })
    }
})

export default router