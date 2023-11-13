const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
    name : String,
    desc : String,
    img : String ,
    githubUrl: String,
    hostedUrl: String,
    publicId : String,
    deletedToken: String
}, {timestamps:true});
module.exports=mongoose.model("Project", ProjectSchema);