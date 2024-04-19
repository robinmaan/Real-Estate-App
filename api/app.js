import express from 'express'

const app = express()

app.use('/api/test',(req,res)=>{
     res.send('it works')
})

app.listen(8800,()=>{
    console.log('server runing')
})