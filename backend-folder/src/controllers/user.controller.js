
import { User } from "../models/user.model.js";

const registerUser = async (req, res ) =>{

    try {
    
    const { username, email, password} = req.body;

    // basic validation
    if(!username || !email || !password){
        return res.status(400).json({message: "All fields are required !"})
    }

    // check whether the user already exists
    const existingUser = await User.findOne({email: email.toLowerCase()});
    if(existingUser){
        return res.status(400).json({message: "User already exists !"})
    }


    // creating a new user
    const user  = await User.create({
        username, 
        email,
        password
    });

    res.status(201).json({message: "User added successfully ",
        user: {id : user._id, email: user.email, username: user.username}
    })
    
    } catch (error) {
    res.status(500).json({message: "Internal server error", error: error.message})
    }
}


export { registerUser }