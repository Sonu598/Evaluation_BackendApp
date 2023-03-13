const express=require('express');
const { connect } = require('./config/db');
const { userRouter } = require('./routes/user.route');
const { productRouter } = require('./routes/product.route');
const { generateToken, generateRefreshToken, verifyToken, verifyRefreshToken, cookieParser }=require('./middleware/authenticate');

const cors=require('cors');
const app=express();
require('dotenv').config();

app.use(express.json());
app.use(cors())

app.get('/', (req,res)=>{
    res.send('Welcome to Homepage');
})

app.use('/user',userRouter);
app.use(generateToken, generateRefreshToken, verifyToken, verifyRefreshToken, cookieParser);
app.use('/products', productRouter)

app.listen(process.env.Port, async()=>{
    try{
        await connect;
        console.log('Connected to Database');
    }catch(err){
        console.log(err,message);
    }
    console.log(`Server is running at Port ${process.env.Port}`);
})