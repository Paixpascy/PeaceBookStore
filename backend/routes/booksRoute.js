const express=require('express')
const mongoose=require('mongoose')
const bookModel=require('../models/booksmodel')
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('hello there welcome to Peace Pascy Library')
})

//reading
router.get('/getbooks',async(req,res)=>{
    try {
        const item= await bookModel.find()
         res.status(202).send({data:item})
    } catch (error) {
        res.status(404).send({message:'opps books not found'})
    }
})
// 
router.get('/getbook/:id',async(req,res)=>{
    const bkid=req.params.id.trim()
    try {
        const bk=await bookModel.findById(bkid)
        if(!bk){
            return res.status(404).send({message:"book not found"})
        }
        return res.status(202).json({data:bk})
    } catch (error) {
        res.status(500).send(error)
    }
})

//posting
router.post('/addbook',async(req,res)=>{
    try {
        const {picture, name,author, price, stoke}=req.body
        if(!picture || !name || !author || !price ||!stoke){
            return res.status(404).send({message:"all fields required"})
        }
        const newItem= new bookModel({
            picture,
            name,
            author,
            price,
            stoke,
        })
        await newItem.save()
        res.status(202).json({data:newItem})
    } catch (error) {
        res.status(500).send({error:`error posting book due to ${error.message}`})
    }
})

router.put('/editbook/:id',async(req,res)=>{
    try {
        const {picture, name, author, price, stoke}=req.body
        if(!picture ||! name ||!author ||!price ||!stoke){
            return res.status(404).send({message:"all fields nedded"})
        }
        const { id }=req.params
        const updatedItem= await bookModel.findByIdAndUpdate(id,{$set:{picture, name, author, price, stoke}},{new:true})
        if(!updatedItem){
            return res.status(404).send({message:"book not found"})
        }
        res.status(202).send({data:updatedItem})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/deletebook/:id',async(req,res)=>{
    const { id }=req.params
    try {
        const deletedItem= await bookModel.findByIdAndDelete(id)
        if(!deletedItem){
            return res.status(404).send({message:"book not found"})
        }
        res.status(202).send({message:'book deleted successfully'})
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports=router






