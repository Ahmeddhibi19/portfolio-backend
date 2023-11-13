const Project = require("../models/ProjectModel");
exports.getProjects = async(req,res)=>{
    try {
        const projects=await Project.find();
        if(!projects){
            return res
            .status(401)
            .json({success:false , message : "Projects not found"});
        }
        return res.status(200).json({success : true , projects});


    } catch (error) {
       return res.status(500).json({success : false , message:error.message });
    }
};
exports.addProject = async(req,res)=>{
    const {name , desc , githubUrl , hostedUrl , secureUrl, publicId , deleteToken} = req.body;
    try {
        
        if(!name || !desc){
            return res
            .status(401)
            .json({success:false , message : "Please fill all the fields"});
        }
        const newProject = await Project.create({
            name,
            desc,
            githubUrl,
            hostedUrl,
            img : secureUrl,
            publicId,
            deleteToken,
        });
        await newProject.save();
        return res.status(200).json({success : true , message : "New Project added"});
    } catch (error) {
       return res.status(500).json({success : false , message:error.message });
    }
};

exports.removeProject = async (req,res) => {
    const {id} = req.params;
    try {
        
        const project =await Project.findByIdAndDelete(id);
        if(!project){
            return res
            .status(404)
            .json({success:false , message : "Projects not found"});
        }
    } catch (error) {
        return res.status(500).json({success : false , message:error.message });
    }
};

exports.updateProject = async(req,res)=> {
    const {id}=req.params;
    const updatedData = req.body ;

    try {
        
        let project = await Project.findById(id);

        if(!project){
            return res
            .status(404)
            .json({success:false , message : "Project not found"});
        }
        // check if the image proprty is present in the updated data and has a value;
        if(updatedData.img){
            project.img = updatedData.img
            
        }
        // directly  set the othr fields of the project object from the updated data
        for(const key in updatedData){
            if(key !== "img"){
                project[key]= updatedData[key];
            }
        }
        await project.save();
        return res.status(200).json({success : true , message : "Project updated succussfully !"});
    } catch (error) {
        return res.status(500).json({success : false , message:error.message });
    }
}