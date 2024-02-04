import dotenv from 'dotenv'
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path: './.env'
})
const port = process.env.PORT || 4000
connectDB()
.then(()=>{
app.listen(port, (req, res) => {
    console.log(`server is starting at port http://localhost:${port}`)
})
})
.catch((err)=>{
    console.log("MOONGODB connection error!!", err)
})

 