const jwt=require("jsonwebtoken")
const secret="$ahil"

function createJWTtoken(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileimageURL:user.profileimageURL,
        role:user.role
    }
    token=jwt.sign(payload,secret);
    return token;
}


function verifytoken(token){
    const payload=jwt.verify(token,secret);
    return payload;
}

module.exports={
    createJWTtoken,
    verifytoken,
}