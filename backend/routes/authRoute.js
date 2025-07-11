const express=require('express')
const mongoose=require('mongoose')
const router=express.Router()
const authModel= require('../models/authmodel')
const jwt=require('jsonwebtoken')
const authMiddleware = require('../middleware/authMiddleware')
require('dotenv').config()

router.post('/register',async(req,res)=>{
    try {
        const{name,email,password,Dob,address,gender,phoneNumber}=req.body
        if(!name || !email || !password ){
            return res.status(404).send({message:'missing field'})
        }

        const validEmail=/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if(!validEmail){
            return res.status(400).send({message:'email id is invalid'})
        }

        const emailExists= await authModel.findOne({email}) //const exists= await authModel.findOne({email})
        if(emailExists){
            res.status(400).send({message:'email id already exists please use another'})
        }

        const newUser= new authModel({
            name,
            email,
            password,
            Dob,
            gender,
            address,
            phoneNumber
        })
        await newUser.save()

        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'2d'})
        res.status(202).json({data:newUser,token,role:newUser.role})
    } catch (error) {
        res.status(500).send({error:`error registering due to ${error.message}`})
    }
})

router.get('/getUsers',async(req,res) =>{
    try {
        const users= await authModel.find()
        if(!users){
            return res.status(404).send({error:'users not found'})
        }
        res.status(202).json({data:users})
    } catch (error) {
        res.status(500).send({error:`error getting users due to ${error.message}`})
    }
})

router.post('/login',async(req,res) =>{
    try {
        const{email,password}=req.body
        if(!email || !password){
            return res.status(404).send({message:'missing fields'})
        }
        const user= await authModel.findOne({email})
        if(!user){
            return res.status(404).send({message:'user does not exist'})
        }

        if(user.password !==password){
            return res.status(400).send({message:'incorrect password'})
            }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'2d'})
        res.status(202).json({data:user,token,role:user.role})    
    } catch (error) {
        res.status(500).send({error:`login error is ${error.message}`})
    }
})

router.post('/logout',async(req,res) =>{
    try {
        res.clearCookie('token')
        res.status(202).send({message:'logout successful',success:true})
    } catch (error) {
        res.status(500).send({error:`unable to logout due to ${error.message}`})
    }
})

router.get('/getUser/:id',async(req,res) =>{
    try {
        const id=req.params
        const user= await authModel.findById(id).select('-password')
        if(!user){
            return res.status(404).send({message:'user not found'})
        }
        res.status(202).json({data:user})
    } catch (error) {
        res.status(500).send({error:`error registering due to ${error.message}`})
    }
})

router.put('/editrole/:id',async(req,res) =>{
    try {
        const {id}= req.params
        const{role}=req.body

        const editedUser= await authModel.findByIdAndUpdate(id,{role},{new:true})
        if(!editedUser){
            return res.status(404).send({message:'unable to edit user role'})
        }
        res.status(202).json({data:editedUser.role})

    } catch (error) {
        res.status(500).send({error:`error editing role due to ${error.message}`})
    }
})

router.delete('/unregister',authMiddleware,async(req,res) =>{
    try {
        const id=req.user.id
        console.log('deleting user with id',id)
        const deleteUser=await authModel.findByIdAndDelete(id)

        if(!deleteUser){
            return res.status(404).send({message:'unable to delete account'})
        }
        res.status(202).json({data:deleteUser,message:'account deleted'})

    } catch (error) {
        res.status(500).send({error:`error unregistering due to ${error.message}`})
    }
})

router.get('/userInfo/:id',authMiddleware,async(req,res) =>{
    try {
        const id=req.user.id
        console.log('user id is',id)
        const user= await authModel.findById(id)
        
        if(!user){
            return res.status(500).send({message:'user information not found'})
        }
        res.status(202).json({data:user}
            
        )
    } catch (error) {
        res.status(500).send({error:`error getting user information due to ${error.message}`})
    }
})

router.get('/getProfile/:id',authMiddleware,async(req,res) =>{
    try {
        const id=req.user.id
        const user= await authModel.findById(id).select('-password')
        if(!user){
            return res.status(404).send({message:'user not found'})
        }
        res.status(202).json({data:user})
    } catch (error) {
        res.status(500).send({error:`error registering due to ${error.message}`})
    }
})

router.put('/editprofile/:id',authMiddleware,async(req,res)=>{
    try {
        const id=req.user.id
        const{name,email,picture,Dob,address,gender,phoneNumber}=req.body
        const editedProfile=await authModel.findByIdAndUpdate(id,{$set:{name,email,picture,Dob,address,gender,phoneNumber}},{new:true})

        if(!editedProfile){
            return res.status(404).send({message:'unable to edit profile detils'})
        }
        res.status(202).json({data:editedProfile})
    } catch (error) {
        res.status(505).send({error:`our profile edit error is ${error.message}`})
    }
})
module.exports=router