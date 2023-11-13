const {createTransport} = require("nodemailer");
const sendMessage = async(userMessage)=> {
    //important things to know is creatTransport and sendmail


    //setting up transporter
    const transporter = createTransport({
        service : "gmail",
        auth :{
            user : process.env.APP_EMAIL,
            pass : process.env.APP_PASSWORD,
        },
       
    })
     // sending the message
     const sentMessage = await transporter.sendMAIL({
        from : process.env.APP_EMAIL,
        to : process.env.APP_EMAIL,
        subject : "New message from portfolio site",
        text : userMessage,
    });
    return sentMessage;
}

module.exports={sendMessage}