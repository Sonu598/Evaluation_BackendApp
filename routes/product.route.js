const express=require('express');
const { ProductModel } = require('../model/product.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { verifyToken, verifyRefreshToken } = require('../middleware/authenticate');

const productRouter=express.Router()

// Protected route
productRouter.get('/products', verifyToken, (req, res) => {
    res.send(`Welcome ${req.user.username} to the Product Page`);
});

//Add product
productRouter.post('/addproducts', verifyToken, async (req,res)=>{
    const payload=req.body;
    const product=new ProductModel(payload);
    await product.save();
    res.send({'msg': 'Product has been added'});
})

//Delete the product
productRouter.delete('/deleteproducts/:id', verifyToken, async(req,res)=>{
    const productID=req.params.id;
    await ProductModel.findByIdAndDelete({_id:productID});
    res.send({'msg': `Product with ID ${productID} has been deleted`});
})
  
// Refresh JWT token
productRouter.get('/refresh', verifyRefreshToken, (req, res) => {
    const token = generateToken(req.user);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 300000 }); // cookie expiry time of 5 min
    res.send('Token refreshed successfully');
});

module.exports={
    productRouter
}