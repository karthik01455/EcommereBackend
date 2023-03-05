const express = require('express');
const usersController = require('../controllers/users');
const usersRouter =express.Router();
usersRouter.post('/createUser',usersController.createUser);
usersRouter.get('/login',usersController.login);
module.exports=usersRouter;