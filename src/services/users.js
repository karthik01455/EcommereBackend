const { Users } = require('../../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const redis = require('redis');
// var session = require('express-session');
// var RedisStore = require('connect-redis')(session);
function generateAccessToken(username) {
  return jwt.sign(username, 'SECRET', { expiresIn: '1800s' });
}
// const client = redis.createClient({
//   socket: {
//     port: '6357'
//   }
// });
// client.on('connect', () => {
//   console.log('Connected to Redis');
// });
// client.on('error', err => {
//   console.log('Error ' + err);
// });

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
    const token = generateAccessToken({ username: emailId });
    
    // resolve client  is closed
    // client.on('error', function(err) {
    //   console.log('Error ' + err);
    // });
    
    // client.set('token', token, function(err, reply) {
    //   console.log(reply);
    // });
    return token;
  } else {
    throw new Error('Invalid Password');
  }
}

module.exports = { login, createUser };
