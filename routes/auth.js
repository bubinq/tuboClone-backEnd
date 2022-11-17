import express from "express"
const router = express.Router()
import { signUp, logIn, logout } from '../controllers/auth.js'

router.post('/signup', signUp)
router.post('/login', logIn)
router.get('/logout', logout)


export default router