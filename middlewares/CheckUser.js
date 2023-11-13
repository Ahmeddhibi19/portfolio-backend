const jwt = require("jsonwebtoken");

exports.checkUser = async(req,res,next)=>{
    const {token}= req.cookies ;
    try {
        // check if token is not present 
        if(!token){
            return res
            .status(401)
            .json({success:false , message : "please login first"});
        }
        //verify token 
        const user=jwt.verify(prevToken,process.env.JWT_SECRET );
        //clear prev token
        res.clearCookie("token");
        //creat new token
        const  newToken =jwt.sign({id : user.id}, process.env.JWT_SECRET, {
            expiresIn : "30s",
        });
        
        //setting the new token in cookie
        res.cookie("token",newToken ,{
            path : "/",
            httpOnly : true,
            expiresIn : new Date(Date.now() + 1000*30),
            sameSite : "lax"
        });
        return res.status(200).json({success : true , message : "User is logged in ",user});
        
        
    } catch (error) {
        return res.status(401).json({success : false , message : "Invalid token or token expired" });
        
    }
}