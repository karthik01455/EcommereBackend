const { Users } = require('../../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {redisClient}= require('../utils/redis');
const EXPIRATION_TIME_SECONDS=process.env.EXPIRATION_TIME_SECONDS;

function generateAccessToken(emailId) {
  return jwt.sign(emailId, process.env.SECRET_KEY ?? 'SECRET', { expiresIn: '1800s' });
}

async function createUser(userName, emailId, phoneNumber, address, password) {
  try {
   
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await Users.create({
      userName,
      emailId,
      phoneNumber,
      address,
      password: passwordHash
    });
  
    
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
  
async function login(emailId, password) {
  const user = await Users.findOne({ where: { emailId } });
  if (!user) {
    throw new Error('Invalid EmailId');
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = generateAccessToken({ emailId });
    
    const result = await redisClient.set(token, emailId, {
      'EX': EXPIRATION_TIME_SECONDS
    });
    console.log('redis result',result);
    const email = await redisClient.get(token);
    console.log('redis emailId',email);
    return token;

  } else {
    throw new Error('Invalid Password');
  }
}

module.exports = { login, createUser };
