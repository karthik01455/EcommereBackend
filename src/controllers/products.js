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
module.exports={addProduct,viewProducts};