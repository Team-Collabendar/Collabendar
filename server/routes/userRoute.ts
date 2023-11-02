const userExpress = require('express');
const userRouter = userExpress.Router();
import user from '../controllers/userControllers';
import calendar from '../controllers/calendarControllers';


userRouter.get('/', (req, res) => {
  return res.status(200).json({})
})


//create user
userRouter.post('/', user.createUser, calendar.createCalendar, (req, res) => {
  return res.status(200).json({})
})
  

//PATCH users --> remove calendar ForeignID from a user's profile in database - when they click toremove that calendar from their profileapp.patch('user', (req, res) => {
    //Sure, we can run the middleware here that removes the row from user_calendars that pertains to a specific user... 
userRouter.patch('/', (req, res) => {
  return res.status(200).json({})
})

userRouter.delete('/', (req, res) => {
  return res.status(200).json({})
})



module.exports = userRouter;
  