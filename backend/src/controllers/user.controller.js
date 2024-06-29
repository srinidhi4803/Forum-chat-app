import User from '../models/user.model.js'

const registerUser=async (req,res)=>{
    res.status(200).json({
        message:"Register User"
    });
}
const loginUser=async (req,res)=>{
    res.status(200).json({
        message:"Login User"
    });
}

export {registerUser,loginUser};