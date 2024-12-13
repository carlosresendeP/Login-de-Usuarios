//resumndo os middlewares ficam no meio do caminho para acessar o banco de dados altorizando ou não o acesso 
//(req, res, next)
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req, res, next) =>{

    const token = req.headers.authorization
    
    if(!token){
        return res.stautus(401).json({message: 'Acesso negado'})
    }


    try{
        //vai verificar o token e vai substituir o 'bearer ' por nada deixando apenas o token
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
        //vai gerar o id e as datas que foram criados e a expiração datas no modelo  UNIX TIMESTAMP
        //console.log(decoded);

        req.userId = decoded.id
    

    }catch(err){
        return res.status(401).json({message: 'Token invalido'})
    }
    next()
}

export default auth