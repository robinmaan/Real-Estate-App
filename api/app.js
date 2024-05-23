import express from 'express'
import cookieParser from 'cookie-parser'
import PostRoute from './routes/post.route.js'
import authRoute from './routes/auth.route.js'
import cors from 'cors'

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({origin: process.env.CLIENT_URL,credentials:true}))
//credentials: true: This option tells the server to include credentials
// (cookies, authorization headers, etc.) in the CORS requests.
// This is necessary if your application needs to send or receive cookies across origins.
app.use('/api/posts',PostRoute)
app.use('/api/auth',authRoute)

app.listen(8800,()=>{
    console.log('server runing')
})