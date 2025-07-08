import bcrypt from "bcryptjs";
import mongoose, { mongo } from "mongoose";

export interface IUser extends Document {
    username:string,
    email:string,
    password:string,
    createdAt?:Date,
    updatedAt?:Date,
    _id?:mongoose.Types.ObjectId
}

const UserSchema = new mongoose.Schema<IUser> ({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[ /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/, "Please enter a valid email address" ]
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

UserSchema.pre("save", async function (next) {
    if (this.isModified(this.password)) {
        this.password= await bcrypt.hash(this.password,10)
    }
    next()
})

const User = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema)

export default User