import './config/mongoDB.js'
import {router as MoviesRouter} from "./routers/movies.js";
import {router as authRouter} from './routers/auth.js'
import express from 'express'; //const express = required("express")

const PORT = process.env.PORT ?? 3000
const app = express()
app.use(express.json())
app.use("/api/v1/movies", MoviesRouter)
app.use("/api/v1/movies", authRouter)

app.listen(PORT, (err)=>{
    err?console.log(`Error de servidor: ${err}`)
    :
    console.log(`Server up: http://localhost:3000`)
})