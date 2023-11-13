const { sendMessage } = require("../middlewares/SendMessage");

exports.contact= async(res,req)=>{
    try {
        
        const {name,email,message} = req.body;
        const userMessage= `Name : ${name}\nEmail : ${email}\nMessage : ${message}`;
        const sentMessage= await sendMessage(userMessage);
        if(!sentMessage){
            return res
            .status(400)
            .json({success:false , message : "Message not sent"});
        }
        return res.status(200).json({success : true , message:"Message sent successfully"});

    } catch (error) {
        return res.status(500).json({success : false , message:error.message });
    }
}