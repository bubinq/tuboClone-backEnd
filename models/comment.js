import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    videoId: {
        type: String,
        required: true
    }
    
}, {timestamps: true})

export default mongoose.model('Comment', commentSchema)