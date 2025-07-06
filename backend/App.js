const express=require('express')
const app=express()
const port=3004
const mongoose=require('mongoose')
const cors=require('cors')
const path=require('path')
const multer=require('multer')


app.use(express.json())
app.use(cors())

const bookModel=require('./models/booksmodel')
const authModel=require('./models/authmodel')
const ordersModel=require('./models/ordersmodel')

const AuthRoute=require('./routes/authRoute')
const BookRoute=require('./routes/booksRoute')
const OrdersRoute=require('./routes/ordersRoute')

app.use('/authRoute',AuthRoute)
app.use('/booksRoute',BookRoute)
app.use('/ordersRoute',OrdersRoute)

const connectDb=async()=>{
    try{
        await mongoose.connect('mongodb://localhost/library',{})
    }catch(error){
        console.log(error)
    }
}
connectDb()

const upload=multer.diskStorage({
    destination:((req,file,cb) =>{
        cb(null,'public')
    }),
    filename:((req,file,cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    })
})

const uploadMiddleware=multer({storage:upload})
app.post('/images',uploadMiddleware.single('image'),async(req,res)=>{
    try {
        res.status(200).json({image_url:`http://127.0.0.1:${port}/image/${req.file.filename}`})
    } catch (error) {
        res.status(505).send({error:`unable to upload pictuter due to${error.message}`})
    }
})
app.use('/image',express.static('public'))
app.listen(port,(error)=>{
    if(error){
        console.log('your error is',error)
    }else{
        console.log(`we are using port ${port}`)
    }
})