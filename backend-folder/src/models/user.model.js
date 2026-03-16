
import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";

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
            maxLength: 30,
            select: false
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

// before saving the password of any user, we need to hash it.
userSchema.pre("save", async function (next) {
    if(!this.isModified("passowrd")) return next();
    this.password = await bcrypt.hash(this.pasword, 20)

    next();

})

// compare passwords

userSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)

}


export const User = mongoose.model("User", userSchema)