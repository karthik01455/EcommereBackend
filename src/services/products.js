const {Products}= require('../../database/models');
async function addProduct( productName,productId,price)
{
  const result = await Products.create({
    productName,
    productId,
    price
  });
  return result;
}
async function viewProducts()
{
  const result= await Products.findMany();
  return result;
}
module.exports={addProduct,viewProducts};