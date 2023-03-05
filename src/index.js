const express = require('express');
const usersRouter = require('./routers/users');
const productsRouter = require('./routers/products');
const app = express();
const PORT = 5679;
app.use(express.json());
app.use('/users',usersRouter);
app.use('/products',productsRouter);
app.listen(PORT, () => {
  console.log(`Application Started in PORT: ${PORT}`);   
});