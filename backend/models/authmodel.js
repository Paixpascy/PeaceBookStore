const mongoose=require('mongoose')
const express= require('express')

const authSchema=mongoose.Schema({
    /*UserId:{
        type:String,
        required:true
    },*/
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'user',
    },
})

const authModel=mongoose.model('users',authSchema)

module.exports=authModel