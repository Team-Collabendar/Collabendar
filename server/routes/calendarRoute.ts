const calendarExpress = require('express');
const calendarRouter = calendarExpress.Router();
import calendar from '../controllers/calendarControllers';


//post calendar (for creating calendars)
calendarRouter.post('/', calendar.createCalendar, calendar.addUser, (req, res, next) => {
  return res.status(200).json({});
})


//get calendar (for switching calendars)
calendarRouter.get('/', calendar.getCalendar, (req, res, next) => {
  return res.status(200).json(res.local.calendar);
})

// DIFFERENT get route (for viewing all calendars a user has on their profile)
calendarRouter.get('/userCalendars', calendar.getCalendarsByUser, (req, res, next) => {
  return res.status(200).json(res.local.calendarsByUser);
})


    //here we also use "getCalByUser" because we want to immediately send the updated list to the front end
calendarRouter.patch('/', calendar.removeUser, calendar.getCalendarsByUser, (req, res, next) => {
  return res.status(200).json(res.locals.calendarsByUser);
})


//delete calendar (not commonly used - user deleting calendar where they're the only user, or if we let them delete a collabender)
calendarRouter.delete('/', (req, res, next) => {
  return res.status(200).json({});
})

module.exports = calendarRouter;