const {verifytoken}=require("../services/authentication")

function checkforauthenticationcookie(cookiename){
    return (req,res,next)=>{
        const tokencookievalue=req.cookies[cookiename];
        if(!tokencookievalue) {
            return next();
        };

        try {
            const userpayload=verifytoken(tokencookievalue)
            req.user=userpayload;
            return next();
        } catch (error) {
            next();
        }
    }
}

module.exports={
    checkforauthenticationcookie,
}