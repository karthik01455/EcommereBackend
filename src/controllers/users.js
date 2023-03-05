const usersServices = require('../services/users');
async function createUser(req,res){
  try{
    console.log('controller');
    const {userName,emailId,phoneNumber,address,password} = req.body;
    const user = await usersServices.createUser(userName,emailId,phoneNumber,address,password);
    res.status(201).send(user);
  }
  catch(err){ 
    res.status(400).send(err);
  }
    
}
async function login(req,res){
  try{
    const {emailId, password} = req.body;
    const user = await usersServices.login(emailId, password);
    res.status(200).send(user);
  }
  catch(err){
        
    res.status(400).send(err);
  }
}

module.exports={createUser,login};