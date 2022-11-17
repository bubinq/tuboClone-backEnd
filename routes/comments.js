import express from "express"
import { addComment, deleteComment, getAllComments } from "../controllers/comment.js"
const router = express.Router()
import { verifyToken } from '../verifyToken.js'

router.get('/allcomments/:videoId', getAllComments)
router.post('/video/:videoId', verifyToken, addComment)
router.delete('/delete/:commentId', verifyToken, deleteComment)

export default router