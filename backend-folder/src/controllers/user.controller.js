
import { User } from "../models/user.model.js";

// adding a new user

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
        email: email.toLowerCase(),
        password
    });

    res.status(201).json({message: "User added successfully ",
        user: {id : user._id, email: user.email, username: user.username}
    })
    
    } catch (error) {
    res.status(500).json({message: "Internal server error", error: error.message})
    }
}


// The user logging in into the system with their credentials.
const loginUser = async (req, res) => {
    try {
     // checking if the user already exists

     const {email, password} = req.body

     const user = await User.findOne({
        email: email.toLowerCase()
     }).select("+password");

     if(!user) return res.status(404).json({message: "User not found"})

    // checking and comparing passwords 

    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(400).json({message: "Invalid credentials"})

    res.status(200).json({message: "User logged in sucessfully",
        user: {
            id: user._id,
            email: user.email,
            username: user.username
        }
    })  
        
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}


const logoutUser = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({
            email
        })

        if(!user) return res.status(404).json({message: "User not found!"})

        res.status(200).json({message: "Logout successful!"})


    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }   
}



export { registerUser, loginUser, logoutUser }