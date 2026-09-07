import User from "../modules/user.module.js";
import bcrypt from "bcrypt";
export const signup = async(req,res)=>{
    const{username,email,password}=req.body;
    const hashedPassword = bcrypt.hashSync(password,10);
    const newUser = new User({username,email,password: hashedPassword});
    try{
    await newUser.save();
    res.status(201).json('user created succefully!');
    }catch(error){
        res.status(500).json(error.message);
    }
    
}