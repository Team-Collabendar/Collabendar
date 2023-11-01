const userExpress = require('express');
const userRouter = userExpress.Router();

userRouter.get('/', (req, res) => {
  return res.status(200).json({})
})

//create user
userRouter.post('/', (req, res) => {
  return res.status(200).json({})
})
  
//PATCH users --> remove calendar ForeignID from a user's profile in database - when they click toremove that calendar from their profileapp.patch('user', (req, res) => {
userRouter.patch('/', (req, res) => {
  return res.status(200).json({})
})

userRouter.delete('/', (req, res) => {
  return res.status(200).json({})
})



module.exports = userRouter;
  