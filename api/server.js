import express from 'express'
import publicRouters from "./routes/public.js"
import privateRoutes from "./routes/private.js"
import auth from './middlewares/auth.js'

import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors('http://localhost:5173'))

app.use("/", publicRouters )

app.use("/", auth, privateRoutes)

app.listen(3000, ()=> console.log("Servidor ON"));