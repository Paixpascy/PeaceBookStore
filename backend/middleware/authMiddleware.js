
const jwt=require('jsonwebtoken')
require('dotenv').config()

const authMiddleware=((req,res,next) =>{
    const token=req.headers.authorization?.split(' ')[1]
    console.log("our token is",token)
    if(!token){
        return res.status(404).send({message:'no token given access denied'})
    }
    try {
        const verified=jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(verified.id){
            req.user={id:verified.id}
            console.log('req.user is',req.user)
        }
        next()
    } catch (error) {
        res.status(500).send({error:`authmiddleware due to ${error.message}`})
    }
})

module.exports=authMiddleware