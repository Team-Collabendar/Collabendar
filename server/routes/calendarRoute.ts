const express = require('express');
const router = express.Router();

//get calendar (for switching calendars)
router.get('/', (req, res, next) => {
  return res.status(200).json({});
})


//MULTIPLE patch calendar routes... 
//for updating calendar with newly added user
//for updating calednar with newly added events
router.patch('/', (req, res, next) => {
  return res.status(200).json({});
})


//post calendar (for creating calendars)
router.post('/', (req, res, next) => {
  return res.status(200).json({});
})

//delete calendar (not commonly used - user deleting calendar where they're the only user, or if we let them delete a collabender)
router.delete('/', (req, res, next) => {
  return res.status(200).json({});
})

module.exports = router;