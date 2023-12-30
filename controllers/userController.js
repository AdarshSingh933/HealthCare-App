const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const registerController = async(req,res)=>{
    try{
        const existingUser = await userModel.findOne({email:req.body.email});
        if(existingUser){
           return res.status(200).send({success:false,message:'User already exist'});
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        req.body.password = hashPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({message:"Register successful",success:true});
    }catch(error){
    console.log("error in login",error);
    res.status(500).send({success:false,message:`Register Controller ${error.message}`})
    }
}

const loginController = async(req,res)=>{
   try{
    const user = await userModel.findOne({email:req.body.email});
    if(!user){
        return res.status(200).send({message:"User is not found",success:false});
    }
    const isMatch = bcrypt.compare(req.body.password,user.password);
    if(!isMatch){
       return res.status(200).send({message:"User Email or Password is incorrect",success:false});
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
    res.status(200).send({message:'Login success',success:true,token});
   }catch(error){
      console.log(error.message);
      res.status(500).send(`something went wrong ${error.message}`);
   }
}

const authController = async(req,res) =>{
   try{
        const user =await userModel.findOne({_id:req.body.uerId});
        if(!user){
           return res.status(400).send({
            message:"User not found",
            success:false
           })
        }else{
         return res.status(200).send({
            success:true,
            data:{
               name:user.name,
               email:user.email
            }
         })
        }
   }catch(error){
      console.log('error',error);
      res.status(500).send({
         message:"auth error",
         success:false,
         error
      })
   }
}

module.exports = {registerController,loginController,authController};