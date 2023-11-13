const User=require("../models/UserModel");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");


//signup route 
exports.signup = async (req,res)=>{
    //getting user data from req.body
    const {name,email,password}= req.body;
    let user;

    try {
        //cheking if user allready exist
        user= await User.findOne({email});
        if(user) return res.status(400).json({msg:"User already exist"});
        
        //haxhing the password

        const securePassword= await bcrypt.hash(password,10);

        // creating user
        user = await User.create({
            name,
            email,
            password:securePassword
        });
        //saving user to db
        await user.save();
        return res.status(201).json({
            success : true,
            message:"user created successfully"})
    } catch (error) {
        return res.status(500).json({success : false , message:error.message })
    }


   
};

exports.login= async (req,res) => {
    const {email , password} = req.body;

    
    try {
        //check if user exist
        let user = await User.findOne({email});
        if(!user)
            return res
               .status(404)
               .json({success:false, message:"Please sign up"});
        // check if password match
        const comparePassword= await bcrypt.compare(password,user.password);
        // if password don't match
        if(!comparePassword)
            return res
                .status(400)
                .json({success:false, message:"Password or/and email does no match !!!"});

        // if password match
        // check if token cookie exists in the request
        const existingToken = req.cookies.token;
        if(existingToken){
            //clear the existing token 
            res.clearCookie("token");
        }
         
        //creating a token
        const token=jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: "30s"});

        //sending token in cookie
        res.cookie("token",token, {
            path : "/" ,
            httpOnly : true, //client side js can't access this cookie
            expiresIn :new Date(Date.now()+ 1000 * 30),
            sameSite: "lax",

        });
        return res.status(200).json({success: true , message:"logged in"})
    } catch (error) {
        return res.status(500).json({success : false , message:error.message });
    }
}

exports.logout = async (req,res) =>{
    try {
        res.clearCookie("token");
        res.status(200).json({success : true , message : "logged out successfully !"})
    } catch (error) {
        return res.status(500).json({success : false , message : error.message });
    }
}