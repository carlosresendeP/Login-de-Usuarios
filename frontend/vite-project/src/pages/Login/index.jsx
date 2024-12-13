import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"

import api from "../../services/api"

function Login() {

    //pegar info do input
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()



    async function handleSubmit(event) {
        event.preventDefault() //não deixa a pagina recarregar

        try {
            //qnd tem o { } vai trazer somente o data dentro do objeto
            const {data:token} = await api.post('/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value

            })

             //renomear data =>   data:token
            //quardar o token no navegador
            localStorage.setItem('token', token)
            console.log(token);

            navigate('/listar-usuarios')
            
            alert('Usuário Logado com Sucesso! ')
        } catch {
            alert('Senha ou Email incorretos')
        }

    }


    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg "  >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

            <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
                <input 
                ref={emailRef} 
                type="email" 
                name="email" 
                placeholder="Email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <input 
                ref={passwordRef} 
                type="password" 
                name="senha" 
                placeholder="Senha" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800">Login</button>
            </form>
            <Link to='/cadastro' className="text-blue-700 hover:text-blue-400 mt-4 block text-center"> Não tem uma Conta? Cadastre-se</Link>
        </div>
    )
}

export default Login
