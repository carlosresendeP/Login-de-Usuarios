import { Link } from "react-router-dom"
import { useRef } from "react"

import api from "../../services/api"

function Register() {

    //pegar info do input
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()



    async function handleSubmit(event) {
        event.preventDefault() //não deixa a pagina recarregar

        try {
            await api.post('/cadastro', {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value

            })
            alert('Usuário Cadastrado com Sucesso! ')
        } catch {
            alert('ERRO ao Cadastrar usuário ')
        }

        console.log(nameRef.current.value);
    }


    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg "  >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastro</h2>

            <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
                <input ref={nameRef} type="text" placeholder="Nome" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <input ref={emailRef} type="email" name="email" placeholder="Email"  required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <input ref={passwordRef} type="password" name="senha" placeholder="Senha" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold tracking-tighter transition-colors duration-300 hover:bg-red-500">Cadastrar-se</button>
            </form>
            <Link to='/login' className="text-blue-700 hover:text-red-500  mt-4 block text-center"> Já tem uma Conta? Faça o Login</Link>
        </div>
    )
}

export default Register
