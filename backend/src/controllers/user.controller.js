import User from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const registerUser=async (req,res)=>{
    const {fullname, username,email,password}=req.body;
    
    if(
        [fullname,username,email,password].some((field)=>field?.trim()=="")
    ){
        throw new ApiError(400,"All fields are required");
    }

    const existingUser= await User.findOne({$or:[{username},{email}]}).select("-password");

    if(existingUser){
        throw new ApiError(409,"User already exists");
    }
    
    const newUser =await User.create({
        fullname,
        username,
        email,
        password
    });
    
    const createdUser=await User.findById(newUser._id).select("-password");

    if(!createdUser){
        throw new ApiError(500,"User not created");
    }

    res.status(201).json(new ApiResponse(201,"User created",createdUser));
}




const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    
    if([email,password].some((field)=>field?.trim()=="")){
        throw new ApiError(400,"All fields are required");
    }

    const user=await User.findOne({email})
    if(!user){
        throw new ApiError(409,"User Not Found");
    }
    const isUserMatched=await user.isPasswordMatch(password);

    if(!isUserMatched){
        throw new ApiError(40,"Invalid credentials");
    }
    //generate token
    const token=user.generateToken();

    res.status(200).cookie('token', token, {
        httpOnly: true, 
        secure: true, 
        sameSite: 'Strict', 
        maxAge: 3600000 }
    ).json(new ApiResponse(200,"User logged in",user));
}




export {registerUser,loginUser};