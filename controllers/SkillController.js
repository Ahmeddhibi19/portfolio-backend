const Skill = require("../models/SkillModel");

exports.getSkillS = async(req,res)=> {
    try {
        
        const skills=await Skill.find();
        if(!skills){
            return res
            .status(401)
            .json({success:false , message : "skill not found"});
        }
        return res.status(200).json({success : true , skills});

    } catch (error) {
        return res.status(500).json({success : false , message:error.message });
    }
}

exports.addSkill = async(req,res)=> {
    const {skill,level} = req.body;
    try {
        const newSkill = await Skill.create({skill,level});
        await newSkill.save();
        return res.status(200).json({success : true ,message:"New skill added "});
    } catch (error) {
        return res.status(500).json({success : false , message:error.message });
    }
}
exports.removeSkill= async(req,res)=>{
    const {id} = req.params;
    try {
        
        const skill= await Skill.findById(id);
        if(!skill){
            return res
            .status(404)
            .json({success:false , message : "skill not found"});
        }
        return res.status(200).json({success : true ,message:"Skill deletd ! "});

    } catch (error) {
        return res.status(500).json({success : false , message:error.message });
    }
}