import mongoose, {Schema} from "mongoose";


const _userSchema = new Schema({
    email:{type:String , required:true, unique: true },
    name:{type:String , required:true},
    pwd_hash:{type:String , required:true},
    role:{type:String , enums:["admin","user"] , required:true , default:"user"}
},{timestamps:true})
_userSchema.index({ email: 1 }, { unique: true });



export const UserModel = mongoose.model('user' , _userSchema)

