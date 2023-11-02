import db from '../database'

const eventControllers: any = {}
//we COULD do full typing ^^ / use interfaces (great for error logging, but... if we can get it running, who cares? it compiles out to js right?)


eventControllers.createEvent = (req, res, next) => {
  if (req.body.event){
    const text = "INSER INTO events (title, date, start_time, duration, calendar_id) VALUES ($1, $2, $3, $4, $5) RETURNING *"
    const values = [req.body.label, req.body.day, req.body.hour, req.body.length, req.body.id]
    db.query(text, values, (err, result)=> {
        if (err){
          const error = {log: `ERROR occured on "createEvent" middleware with req.body.event = ${req.body.event}`, status: 500, message: "an error occured creating calendar event! (all event fields are REQUIRED)"}
          return next(error);
        }
        else{
          res.locals.newEvent = result.rows[0];
          return next();
        }
    })
  }
}


eventControllers.getAllEvents = (req, res, next) => {
    const text = "SELECT * FROM events" 
    db.query(text, (err, result)=> {
      if (err){
        const error = {log: `ERROR occured on "getAllEvents" middleware with req.body.cal = ${req.body.cal}`, status: 500, message: "an error occured getting calendar events"}
        return next(error);
      }
      else{
        res.locals.events = result.rows;
        return next();
      }
    })
}



eventControllers.getEventsByCal = (req, res, next) => {
  if (req.body.cal){ // WILL NEED TO USE spread operator (to grab all calendar id's on req.body) --> when we want to have a multi-cal-view....
    const text = "SELECT * FROM events WHERE calendar_id = $1" //HOW to refactor to have optional multiple? append + push to values as below for edit event 
    const values = [req.body.cal]
    db.query(text, values, (err, result)=> {
      if (err){
        const error = {log: `ERROR occured on "getEventsByCal" middleware with req.body.cal = ${req.body.cal}`, status: 500, message: "an error occured getting calendar events"}
        return next(error);
      }
      else{
        res.locals.eventsByCal = result.rows; //(should be [{event},{event},{}]) - all the events with this calendar_id as their foreign key
        return next();
      }
    })
  }
}

  //Don't think we actually need this... do we ever need to get a single event?

// eventControllers.getEvent = (req, res, next) => {
//   if (req.body.event){
//     const text = "SELECT * FROM events WHERE id = $1" // or use name? no, use id... 
//     const values = [req.body.event]
//     db.query(text, values, (err, result)=> {
//       if (err){
//         return next(err)
//       }
//       else{
//         res.locals.event = result.rows[0]
//         return next()
//       }
//     })
//   }
// }


eventControllers.editEvent = (req, res, next) => {
  //REFACTOR? - yeah, see notes below...
  if (req.body.event.title){// DIFFERENT based on actual req.body
    const text = "UPDATE events SET (title = req.event.title) WHERE (id = req.body.event.id) RETURNING *" // THIS WILL BE DIFFERENT BASED ON REQ.BODY
    const values = [] // wait... how do you use values for an update query again?
    db.query(text, values, (err, result)=> {
      if (err){
        const error = {log: `ERROR occured on "editEvent" middleware with req.body.title = ${req.body.title}`, status: 500, message: "an error occured editing calendar event"}
        return next(error)
      }
      else{
        res.locals.editedEvent = result.rows[0]
        return next()
      }
    })
  }
  ////DEPENDING on which req.body properties exist... you need to iteratively append to 'text' and push to 'values'... in order 
  ////OTHERWISE... you have to try some shit like what's immediately below.. which won't even cover all use cases 
  //
  // if (req.body.event.title){// DIFFERENT based on rew.body
  //   const text = "UPDATE events SET title = req.event.title WHERE id = req.body.event.id RETURNING *" // THIS WILL BE DIFFERENT BASED ON REQ.BODY
  //   const values = [] 
  //   db.query(text, values, (err, result)=> {
  //     if (err){
  //       return next(err)
  //     }
  //     else{
  //       res.locals.event 
  //       return next()
  //     }  
  //   })  
  //}

  ////etc... for other properties that need to be changes... but what if MULTIPLE want to change? (but not all... gets complex. So an iterative / functional approach mentioned above works best) 
}


//DO WE ALSO, want to store the deleted events somewhere in case a user deletes something they want later from their profile?
eventControllers.deleteEvent = (req, res, next) => {
  if (req.body.event){
    //conditional logic -- BUT, ALL req.body IS GONNA BE SOME DIFFERENT NESTED BEAST
    const text = "DELETE FROM events WHERE id = $1 RETURNING *"
    const values = [req.body.event] //req.body WILL BE DIFFERENT
    db.query(text, values, (err, result)=> {
        if (err){
          const error = {log: `ERROR occured on "deleteEvent" middleware with req.body.event = ${req.body.event}`, status: 500, message: "an error occured deleting calendar event"}
          return next(error)
        }
        else{
          res.locals.deletedEvent = result.rows[0]
          return next()
        }
    })
  }
}

export default eventControllers;