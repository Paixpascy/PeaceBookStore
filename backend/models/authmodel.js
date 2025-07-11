const mongoose=require('mongoose')
const express= require('express')

const authSchema=mongoose.Schema({
    picture:{
        type:String,
        default:' '
    },
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
    gender:{
        type:String,
        default:'not selected'
    },
    Dob:{
        type:String,
        default:'not selected'
    },
    address:{
        type:String,
        default:'not selected'
    },
    phoneNumber:{
        type:String,
        default:'0000000'
    },
    role:{
        type:String,
        required:true,
        default:'user',
    },
})

const authModel=mongoose.model('users',authSchema)

module.exports=authModel