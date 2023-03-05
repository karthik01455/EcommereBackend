const {Users,Products,Carts}= require('../../database/models');
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
  const result= await Products.findAll();
  return result;
}
async function addCart(emailId,productId,count)
{const userId = await Users.findOne({
  where: {
    emailId
  },
  attributes: ['id']
});
const result = await Carts.create({
  userId:userId.id,
  productId,
  count
});
return result;
}
async function viewCartByEmail(emailId)
{
  const result = await Carts.findAll({
    include: [{
      model:Users,
      where:{emailId}
    },{model:Products}]
      
    ,
  });
  let sum=0;
  for(let i=0;i<result.length;i++)
  {
    sum+=result[i].count*result[i].Product.price;
  }
  return {sum,result};
}
async function totalOrderByProductName(emailId,productName)
{
  const result = await Carts.findAll({
    include: [{model:Products,
      where:{productName}
    }]
  });
  let sum=0;
  for(let i=0;i<result.length;i++)
  {
    sum+=result[i].count*result[i].Product.price;
  }
  return {sum,result};
}

module.exports={addProduct,viewProducts,addCart,viewCartByEmail,totalOrderByProductName};