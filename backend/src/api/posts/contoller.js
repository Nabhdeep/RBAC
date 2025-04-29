import { errorResponse, successResponse } from "../../services/responses"
import { PostModel } from "./model"

export const addPost = (req , res)=>{
    const {title , content} = req.body
    const user =  req?.user
    console.log(user);
    PostModel.create({
        title:title,
        content:content,
        author:user._id
    })
    .then((_post)=>{
       successResponse(201 , _post , res ) 
    })
    .catch((err)=>{
        console.log(err);
        errorResponse(500 , 'something went wrong' , res)
    })
}

export const getPosts = (req , res)=>{
    PostModel.find()
    .populate('author', 'name email') 
    .then((_posts)=>{
        console.log(_posts);
        successResponse(200 , _posts , res)
    })
    .catch((err)=>{
        console.log(err);
        errorResponse(500 , 'something went wrong', res)
    })
}

export const getPost = (req , res)=>{
    const id = req.params.id
    PostModel.findById(id)
    .then((_post)=>{
        successResponse(200 ,_post , res)
    })
    .catch((err)=>{
        console.error(`Error in /posts/:id` , err)
        errorResponse(500 , 'something went wrong' , res)
    })
}

export const changePost = (req , res)=>{
    const {title , content} = req.body
    const id = req.params.id 
    const user = req.user
    if(user.role!='admin'){
        return errorResponse(400  ,'not allowed' , res)
    }
    PostModel.updateOne({_id:id},{
        title:title,
        content:content
    })
    .then((_update)=>{
        console.log(_update);
        successResponse(200 , {"message":"updated"} , res)
    })
    .catch((err)=>{
        console.error(`Error in PUT /posts/:id` , err)
        errorResponse(500  ,'something went wrong' , res)
    })
}

export const deletePost =  (req , res)=>{
    const id = req.id
    const user = req.user
    if(user.role!='admin'){
        return errorResponse(400  ,'not allowed' , res)
    }
    PostModel.deleteOne({id:id})
    .then((_r)=>{
        if (_r.deletedCount != 1) throw {'message':'unable to delete'}
        successResponse(200 , {"message":"deleted" , "id":id} , res)
    })
    .catch((err)=>{
        console.error(`Error in DELETE /posts/:id` , err)
        errorResponse(500  ,'something went wrong' , res)
    })
}