import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"  //criptografi de senhas
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()
const router = express.Router()


//acessar o .env deve colocar o process
const JWT_SECRET = process.env.JWT_SECRET


//cadastro
router.post('/cadastro', async (req, res) => {

    try {
        const user = req.body

        //bcrypt 
        //criptografando a senha
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)


        //prisma
        const userDb = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword
            },
        })
        res.status(201).json(userDb)
    } catch (err) {
        res.status(500).json({ message: "erro no servidor tente novamente" })
    }

})




//LOGIN

router.post('/login', async (req, res) => {

    try {
        const userInfo = req.body

        //procure apenas um email
        //busca usuario no banco de dados
        const user = await prisma.user.findUnique({ 
            where: { email: userInfo.email},
        })

        //verifica se o usuario exeite dentro do banco
        if (!user){
            return res.status(404).json({message: "usuario nao encotrado" })
        }


        //desencriptar a senha
        // vai comparar a senha do usuario com a do banco de dados
        const isMatch = await bcrypt.compare(userInfo.password, user.password)

        if (!isMatch){
            return res.status(400).json({message: "senha invalida" })
        }


        //gerar o token jwt
                                //payload, secretkey , opitions(dias logados, minutos logados)
        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn:'20m'})


        res.status(200).json(token)
    } catch (err) {
        res.status(500).json({ message: "erro no servidor tente novamente" })
    }

})

export default router


//carlos
//qE8N2x0HZ07AkE4o


//npm install jsonwebtoken
//