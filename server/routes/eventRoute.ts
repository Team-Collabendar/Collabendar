const eventExpress = require('express');
const eventRouter = eventExpress.Router();

//get events (populate all events on the chosen calendar(s))
//Remember, this can handle getting all events from multiple calendars --> iterate through calendars listed in req.body?
eventRouter.get('/', (req, res) => {
  return res.status(200).json({})
})


//create event
eventRouter.patch('/', (req, res) => {
  return res.status(200).json({})
})


//update event
eventRouter.post('/', (req, res) => {
  return res.status(200).json({})
})


//delete events
eventRouter.delete('/', (req, res) => {
  return res.status(200).json({})
})


  
module.exports = eventRouter;