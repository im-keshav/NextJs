import mongoose from "mongoose";
import { IUser } from "@/types/user.types";
import bcrypt from "bcryptjs";


interface UserDocument extends Omit<IUser,'_id'>,Document{
    comparePass(candidatePassword:string):boolean
}


const userSchema = new mongoose.Schema<UserDocument>({
    name:{
        type:String,
        trim:true,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        trim:true,
        required:[true,"email is required"],
        unique:true,
    
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6, "password is too short"]
    },
    mobile:{
        type:String,
        minlength:[10,"mobile is too short"],
        maxlength:[10,"mobile is too long"]
        
    }
},{timestamps:true})

userSchema.pre('save',function():void{
    if(!this.isModified('password'))return 
    this.password = bcrypt.hashSync(this.password,10)
})
userSchema.methods.comparePass = function(candidatePassword:string):boolean{
    return bcrypt.compareSync(candidatePassword,this.password)
}



const UserModel = mongoose.model('user',userSchema)
export default UserModel