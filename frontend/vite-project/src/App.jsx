import { BrowserRouter, Route, Routes } from "react-router-dom"

import Register from '../src/pages/Cadastro/index'
import Login from '../src/pages/Login/index'
import ListarUsuarios from "./pages/Lista"


function App() {

  return (
    <BrowserRouter>
    <header className="bg-gradient-to-r from-blue-500 to-red-500 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center ">Sistema de cadastro de usuários</h1>
    </header>
      <Routes>
        <Route  path="/cadastro"  element={<Register />}/> 
        <Route  path="/"  element={<Login />}/> 
        <Route path="/listar-usuarios" element={<ListarUsuarios />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
