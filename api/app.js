import express from 'express'
import PostRoute from './routes/post.route.js'
import authRoute from './routes/auth.route.js'
const app = express()

app.use(express.json())
app.use('/api/posts',PostRoute)
app.use('/api/auth',authRoute)

app.listen(8800,()=>{
    console.log('server runing')
})