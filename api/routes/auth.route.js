import express from 'express'
import { login, logout, register } from '../controllers/auth.controller.js'

const router = express.Router()

router.get('/register', register)
router.post('/login', login)
router.post('/logout',logout)



export default router


// IN this router file we can retrive the user info and store in our data base so we can make post requests 