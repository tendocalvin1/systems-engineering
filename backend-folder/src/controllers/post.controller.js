
import { Post } from "../models/post.models.js";

// Using CRUD operations to manage posts
// CRUD stands for Create, Read, Update and Delete, which are the four basic operations for managing data in a database.

// creating a new post
const createPost = async (req, res)=>{
    try {
        const {name, description, age} = req.body;

        // basic validation
        if(!name || !description || !age){
            return res.status(400).json({message: "All fields are required !"})};

            const post = await Post.create({
                name,
                description,
                age
            })
            res.status(201).json({message: "Post created successfully !"});
        


    } catch (error) {
        res.status(500).json({message:"Internal Server error", error: error.message})
    }
}


// read all Posts
const getPosts = async (req, res)=>{
    try {
        const posts = await Post.find();
        res.status(200).json(posts)

    } catch (error) {
       res.status(500).json({message: "Internal server error", error: error.message}) 
    }
}

export {createPost, getPosts}