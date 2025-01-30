const { Router }=require("express");
const { user } = require("../models/users");
const router=Router();

router.get("/signup",(req,res)=>{
    return res.render("signup")
})

router.get("/signin",(req,res)=>{
    return res.render("signin")
})

router.post("/signin",async (req,res)=>{
    const { email,password }=req.body;
    try {

        const token=await user.matchpasswordandgeneratetoken(email,password);
        return res.cookie("token",token).redirect("/")

    } catch (error) {
        return res.render("signin",{
            error:"incorrect email or password"
        })
        
    }

})

router.post("/signup",async(req,res)=>{
    const {fullname,email,password}=req.body;
    
    await user.create({
        fullname,
        email,
        password
    })
    return res.redirect("/")
})

router.get("/logout",(req,res)=>{
    return res.clearCookie("token").redirect("/")
})


module.exports=router;
