const express=require('express')
const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    address:{
        type:Object,
        required:true
    },

    phoneNumber:{
        type:String,
        required:true
    },

    items:{
        type:Array,
        required:true
    },

    paymentMethod:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        default:Date.now(),
        required:true
    },
})

const ordersModel=mongoose.model('orders',orderSchema)

module.exports=ordersModel