
import mongoose, {Schema} from "mongoose";

const userSchema = new Schema (
    {
    
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim:true,
            minLength: 1,
            maxLength: 10
        
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: 5,
            maxLength: 30
        },

        email : {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim:true
           
        }
    } , 

        {
            timestamps: true,
        }
    

)

export const User = mongoose.model("User", userSchema)