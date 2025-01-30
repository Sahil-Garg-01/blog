require("dotenv").config()

const express=require("express")
const path=require("path")
const userRoute=require("./routes/users")
const blogRoute=require("./routes/blog")
const mongoose=require("mongoose") 
const cookieParser=require("cookie-parser")
const {checkforauthenticationcookie}=require("./middlewares/authentication")
const{Blog}=require("./models/blog")


const app=express();
PORT=process.env.PORT||8000;
mongoose.connect("mongodb://localhost:27017/BlogBuzz").then(()=>{console.log("mongodb is connected")})


app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkforauthenticationcookie("token"));
app.use(express.static(path.resolve("./public")))


app.set("view engine","ejs") 
app.set("views",path.resolve("./views"))


app.get("/",async (req,res)=>{
    const allblog=await Blog.find({ })
    return res.render("home",{
        user:req.user,
        blogs:allblog
    })
})


app.use("/user", userRoute)
app.use("/blog",blogRoute)


app.listen(PORT,()=>{ console.log(`server started at port ${PORT}`)})