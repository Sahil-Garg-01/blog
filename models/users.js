const {createHmac, randomBytes}=require("crypto")
const {Schema,model}=require("mongoose");
const { createJWTtoken } = require("../services/authentication");

const userschema=new Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    profileimageURL:{
        type:String,
        default:"images/jpegimage.jpg"
    }
}, 
{timestamps: true }
)

userschema.pre('save', function(next){
    const user=this;
    if( !user.isModified("password") ) return;
    
    const salt=randomBytes(16).toString();
    const hashedpassword=createHmac("sha256",salt)
    .update(user.password)
    .digest("hex");

    this.salt=salt;
    this.password=hashedpassword;

    next();
})

userschema.static("matchpasswordandgeneratetoken",async function(email,password){
    const User=await this.findOne({email})

    if( !User ) throw new Error("User not found");

    const salt=User.salt;
    const hashedpassword=User.password;

    const userprovidedhash=createHmac("sha256",salt)
    .update(password)
    .digest("hex");

    if( hashedpassword!==userprovidedhash) throw new Error("password incorrect");

    const token=createJWTtoken(User);
    return token;
})

const user=model("user",userschema)

module.exports={ 
    user,
}