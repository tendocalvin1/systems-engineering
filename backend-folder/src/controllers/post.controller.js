
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

const updatePost = async (req, res)=>{

    try {
        // basic validation to check if the body is empty

        // {name: X, description: Y, age: Z} --> {name, description, age}

        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message: "No data being provided for update"})
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if(!post) return res.status(404).json({message: "Post not found"})

        res.status(200).json({message: "Post Updated Successfully !"})

    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message}) 
    }
}


const deletePost = async (req, res)=>{
    try {
        
        const deleted = await Post.findByIdAndDelete(req.params.id)

        if(!deleted) return res.status(404).json({message: "Post not found !"})

            res.status(200).json({message: "Post successfully deleted"})
        
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
}

export {createPost, getPosts, updatePost, deletePost}