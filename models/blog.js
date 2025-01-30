const {Schema,model}=require("mongoose")

const blogschema=new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },  
    coverimageURL:{
        type:String,
    },
    createdBy:{
        type : Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

const Blog=model("Blog",blogschema)

module.exports={Blog};