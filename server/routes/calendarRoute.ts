const calendarExpress = require('express');
const calendarRouter = calendarExpress.Router();

//get calendar (for switching calendars)
calendarRouter.get('/', (req, res, next) => {
  return res.status(200).json({});
})

//MULTIPLE patch calendar routes... 
//for updating calendar with newly added user
//for updating calednar with newly added events
calendarRouter.patch('/', (req, res, next) => {
  return res.status(200).json({});
})


//post calendar (for creating calendars)
calendarRouter.post('/', (req, res, next) => {
  return res.status(200).json({});
})

//delete calendar (not commonly used - user deleting calendar where they're the only user, or if we let them delete a collabender)
calendarRouter.delete('/', (req, res, next) => {
  return res.status(200).json({});
})

module.exports = calendarRouter;