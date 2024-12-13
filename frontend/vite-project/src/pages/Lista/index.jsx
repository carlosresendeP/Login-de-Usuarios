import { useEffect, useState } from "react"
import api from "../../services/api.js"


function ListarUsuarios() {

    const [allusers, setAllUsers] = useState()

    //é chamado toda vez que a tela carregar
    useEffect(() => {
        async function LoadUsers() {


            const token = localStorage.getItem('token')

            const { 
                //dentro de data vai procuar um users
                data: { users },
            } = await api.get('/listar-usuarios', {
                //headers.authorization
                headers: { Authorization: `Bearer ${token}` }
            })

            setAllUsers(users)
        }


        LoadUsers()

        console.log(allusers);
        
    }, [])


    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border-gray-300 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Listar de Usuários</h2>
            <ul className="space-y-2">
                {allusers && allusers.map(user =>(
                    <li key={user.id} className="bg-gray-100 p-4 rounded-md">
                        <p className="font-semibold">ID: {user.id}</p>
                        <p className="font-semibold">Nome: {user.name}</p>
                        <p className="font-semibold">Email: {user.email}</p>
                    </li>

                ))}
                
            </ul>
        </div>
    )
}

export default ListarUsuarios