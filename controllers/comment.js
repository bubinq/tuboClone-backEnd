import Comment from '../models/comment.js'

export const addComment = async(req, res) => {
    const newComment = new Comment({message: req.body.message, userId: req.user.id, videoId: req.params.videoId})
    try {
        const savedComment = await newComment.save()
        const comments = await Comment.find({videoId: req.params.videoId}).sort({createdAt: -1}).populate('userId')
        res.status(201).json({saved: savedComment, allComments: comments})
        
    } catch (error) {
        console.log(error.message)
        res.status(400).json('Comment was not added')
    }
}

export const getAllComments = async(req, res) => {
    try {
        const comments = await Comment.find({videoId: req.params.videoId}).sort({createdAt: -1}).populate('userId')
        res.status(200).json(comments)
        
    } catch (error) {
        console.log(error.message)
        res.status(400).json('Could not load all comments')
    }
}

export const deleteComment = async(req, res) => {
    const comment = await Comment.findById(req.params.commentId)
    if (req.user.id !== comment.userId) return res.status(403).json('You are not authorized')
    try {
        await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).json('Comment successfully deleted')
        
    } catch (error) {
        console.log(error.message)
        res.status(400).json('Could not delete this comment')
    }
}