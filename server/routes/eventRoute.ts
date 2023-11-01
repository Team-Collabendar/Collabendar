const express = require('express');
const router = express.Router();

//get events (populate all events on the chosen calendar(s))
//Remember, this can handle getting all events from multiple calendars --> iterate through calendars listed in req.body?
router.get('/', (req, res) => {
  return res.status(200).json({})
})


//create event
router.patch('/', (req, res) => {
  return res.status(200).json({})
})


//update event
router.post('/', (req, res) => {
  return res.status(200).json({})
})


//delete events
router.delete('/', (req, res) => {
  return res.status(200).json({})
})


  
module.exports = router;