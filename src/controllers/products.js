const productsServices = require('../services/products');
async function addProduct(req,res)
{
  try{
    const {productName,productId,price} = req.body;
   
    const result= await productsServices.addProduct(productName,productId,price);
    res.status(201).send(result);
  }
  catch(err){ 
    res.status(400).send(err);
  }
    
}
async function viewProducts(req,res)
{
  try{
    const result= await productsServices.viewProducts();
    res.status(200).send(result);
  }
  catch(err){ 
    res.status(400).send(err);
  }
}
async function addCart(req,res)
{
  console.log('controller');
  try{
    const {emailId,productId,count} = req.body;
    const result = await productsServices.addCart(emailId,productId,count);
    res.status(201).send(result);

  }
  catch(err){
    res.status(400).send(err);
  }
}
async function viewCartByEmail(req,res)
{
  try{
    const {emailId} = req.body;
    const result = await productsServices.viewCartByEmail(emailId);
    res.status(200).send(result);
  }
  catch(err){
    res.status(400).send(err);
  }
}
async function totalOrderByProductName(req,res)
{
  try{
    const {emailId,productName} = req.body;
    const result = await productsServices.totalOrderByProductName(emailId,productName);
    res.status(200).send(result);
  }
  catch(err){
    res.status(400).send(err);
  } 
}  

module.exports={addProduct,viewProducts,addCart,viewCartByEmail,totalOrderByProductName};