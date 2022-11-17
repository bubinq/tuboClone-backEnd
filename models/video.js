import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String
    },
    imgUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    likes: {
        type: [String]
    },
    dislikes: {
        type: [String]
    },
    views: {
        type: Number,
        default: 0
    },
    trending: {
        type: Number,
        default: 0
    }
}, {timestamps:true})

export default mongoose.model('Video', videoSchema)