import mongoose, {Schema} from "mongoose";


const _postSchema = new Schema({
    content:{type:String , required:true},
    title:{type:String , required:true},
    author: { type: Schema.Types.ObjectId, ref: "user" , required:true}
},{timestamps:true})



export const PostModel = mongoose.model('post' , _postSchema)

