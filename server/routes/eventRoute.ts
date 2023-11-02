const eventExpress = require('express');
const eventRouter = eventExpress.Router();
import event from '../controllers/eventControllers'



//get events (populate all events on the chosen calendar(s))
//Remember, this can handle getting all events from multiple calendars --> iterate through calendars listed in req.body?
eventRouter.get('/', event.getEventsByCal, (req, res) => {
  return res.status(200).json(res.locals.eventsByCal)
})


//SHOULD WE HAVE ANOTHER ROUTE? eventRouter.get('event') -->that just gets one single event, when you click and wanna display more info on it?


//get all events for quick and dirty display
eventRouter.post('/getEvents', event.getAllEvents, (req, res) => {
  return res.status(200).json(res.locals.events)
})


//create event --> used to have the event.getEventsByCal middleware in here to send back all events 
eventRouter.post('/', event.createEvent, (req, res) => {
      //if we need it we also have the object for this single event as "res.locals.newEvent" here
  return res.status(200).json(res.locals.newEvent)
})


//update event..... IS IT SUPER SLOW IF I USE getEventsByCal multiple times? Could we only send back the 
eventRouter.patch('/', event.editEvent, event.getEventsByCal, (req, res) => {
      //I think we also need getEventsByCal here because we want to send an updated list of calendar events when we edit, no?
  return res.status(200).json(res.locals.eventsByCal)
  //return res.status(200).json(res.locals.editedEvent) //--> if we don't want to getEventsByCal every time, and we just wanna send back the new ivent wit info to edit JUST that piece of state on front end....
})


//delete events
eventRouter.delete('/',event.deleteEvent, (req, res) => {
  return res.status(200).json(res.locals.deletedEvent)
})


  
module.exports = eventRouter;