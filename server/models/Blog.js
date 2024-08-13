import mongoose from "mongoose";

const BlogSchema=new mongoose.Schema({
    title: String,
    image: String,
    post: String,
    createdon: {type: Date, default: Date.now},
    category: String
})

export const blogs=mongoose.model('Blog', BlogSchema);