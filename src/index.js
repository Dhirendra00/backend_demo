import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/index.js';

const app = express();

dotenv.config({
    path: './.env'
})

connectDB();

app.get('/',(res, req)=>{
    res.send('!! app started to the world !!')
})

const port = process.env.PORT || 4000

app.listen(port, (res, req) => {
    console.log(`server is starting at port http://localhost:${port}`)
})