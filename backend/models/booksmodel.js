const express=require('express')
const mongoose=require('mongoose')

const bookSchema=mongoose.Schema({
    picture:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },

    author:{
        type:String,
        required:true
    },

    price:{
        type:String,
        required:true
    },
})

const bookModel=mongoose.model('stoke',bookSchema)

module.exports=bookModel