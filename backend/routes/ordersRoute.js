const express=require('express')
const mongoose=require('mongoose')
const authMiddleware = require('../middleware/authMiddleware')
const ordersModel = require('../models/ordersmodel')
const bookModel = require('../models/booksmodel')
const router=express.Router()
const Stripe=require('stripe')
const stripe=new Stripe(process.env.STRIPE_PAY)


const deliveryCharges=20

router.get('/',async(req,res)=>{
    try {
        res.status(202).send({message:'orders route'})
    } catch (error) {
        res.status(500).send({error:`our error is ${error.message}`})
    }
})

router.post('/stripePaymnet', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id
        const { name, email, phoneNumber, address, items } = req.body
        const { origin } = req.headers

        if (!name || !email || !address || !phoneNumber || 
            !address.country || !address.state || !address.zipcode || !address.city) {
            return res.status(404).send({ message: 'please fill in all the fields' })
        }

        for(bk of items){
            const bkId=bk.iteminfo._id
            if(!bkId){
                return res.status(404).send({message:'book id is invalid'})
            }
            const book=await bookModel.findById(bkId)
            if(book){
                book.stoke -= Number(bk.quantity)
            }
            await book.save()
        }

        const order = new ordersModel({
            userId,
            name,
            email,
            address,
            phoneNumber,
            date: new Date(),
            paymentMethod: 'stripe',
            items
        })

        await order.save()

        const line_items = []

        for (let bk of items) {
            const bookid = bk.iteminfo._id
            const quantity = bk.quantity

            const book = await bookModel.findById(bookid)
            if (!book) {
                return res.status(404).send({ message: 'book not found' })
            }

            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: { name: book.name },
                    unit_amount: Number(book.price) * 100 
                },
                quantity
            })
        }

        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'delivery charges'
                },
                unit_amount: Number(deliveryCharges)* 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true`,
            cancel_url: `${origin}/verify?success=false`,
            line_items,
            mode: 'payment'
        })

        res.status(202).json({ session_url: session.url, order, success: true })

    } catch (error) {
        res.status(500).send({ error: `our payment error is due to ${error.message}` })
    }
})

router.get('/myOrders',authMiddleware,async(req,res)=>{
    try {
        const userid=req.user.id
        const myOrders= await ordersModel.find({userId: userid} ).sort({date:-1})

        if(!myOrders){
            return res.status(404).send({message:'unable to get user orders'})
        }
        res.status(202).json({data:myOrders})
    } catch (error) {
        res.status(500).send({error:`my orders error is due to ${error.message}`})
    }
})

router.get('/allOrders',async(req,res)=>{
    try {
        const allOrders= await ordersModel.find()
        if(!allOrders){
            return res.status(404).send({message:'unable to get all the orders'})
        }
        res.status(202).json({data:allOrders})
    } catch (error) {
        res.status(500).send({error:`all orders error due to ${error.message}`})
    }
})


router.delete('/deleteOrder/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const deletedOrder= await ordersModel.findByIdAndDelete(id)
        if(!deletedOrder){
            return res.status(404).json({data:deletedOrder})
        }
        res.status(202).send({message:'unable to delete order'})
    } catch (error) {
        res.status(404).send({error:`order deletion error due to ${error.message}`})
    }
})
module.exports=router