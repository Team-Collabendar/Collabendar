import db from '../database'

const calendarControllers: any = {}

calendarControllers.createCalendar = (req, res, next, ) => { // req.body.calendarName = "my default calendar" --> was trying to set default for when we create a user, we also run this middleware, and we need a default name since there won't be a req.body with calendarName property in that case
  const text = 'INSERT INTO calendars(name) VALUES($1) RETURNING id'
  const values = [req.body.calendarName] // WHAT WILL THE  req.body  ACTUALLY BE?
  db.query(text, values, (err, result)=> {
    if (err){
      const error = {log: `ERROR occured on "createCalendar" middleware with req.body.name = ${req.body.name}`, status: 500, message: "an error occured creating new calendar, apologies, please try again!"}
      return next(error)
    }
    else{
      const newCalId = result.rows[0].id; // REFACTOR --> into one-liner as with other examples
      //storing the ID of the newly created calendar, so we can populate our 
      // bridge table with it in the next middleware and have our user assinged to the calendar
      res.locals.newCalId = newCalId;
      return next()
    }
  })
}

//NEED TO --> add user to our bridge table for users / calendars
calendarControllers.addUser = (req, res, next) => {
  const text = 'INSERT INTO user_calendars(user_id,calendar_id) VALUES ($1, $2)'
  let calendar;
  if (req.body.calendar_id){///WHAT IS THE ACTUAL REQ BODY COMING IN ON THE ADD USER
    calendar = req.body.calendar_id
  }
  if (res.locals.newCalId){
    calendar = res.locals.newCalId
  }
  const values = [req.body.user, calendar] // WILL BE DIFFERENT WITH ACTUAL req.body.....
  db.query(text, values, (err, result)=> {
    if (err){
      const error = {log: `ERROR occured on "addUser" middleware adding calendar to user profile (in calendarControllers.ts) with req.body.user = ${req.body.user} & req.body.calendar_id = ${req.body.calendar_id}`, status: 500, message: "an error occured subscribing user to calendar"}
      return next(error)
    }
    else{
      return next()
    }
  })
}

calendarControllers.removeUser = (req, res, next) => {
  const text = 'DELETE FROM user_calendars WHERE user_id = $1 AND calendar_id = $2)'
  const values = [req.body.userID, res.locals.calendarID] // WILL BE DIFFERENT WITH ACTUAL req.body.....
  db.query(text, values, (err, result)=> {
    if (err){
      const error = {log: `ERROR occured on "removeUser" middleware (removing a calendar from a user's profile in calendarControllers.ts) with req.body.userID = ${req.body.userID} & req.body.calendarID = ${req.body.calendarID}`, status: 500, message: "an error occured subscribing user to calendar"}
      return next(error)
    }
    else{
      return next()
    }
  })
}



calendarControllers.getCalendar = (req, res, next) => {
  const text = 'SELECT * FROM calendars WHERE calendar_id = $1';
  const values = [req.body.calendarID] // WILL BE DIFFERENT req.body IN REALITY
  db.query(text, values, (err, result) =>{
    if (err){
      const error = {log: `ERROR occured on "getCalendar" middleware with req.body.calendar = ${req.body.calendar}`, status: 500, message: "an error occured switching calendars, please try again"}
      return next(error)
    }
    else{
      res.locals.calendar = result.rows[0];
      return next();
    }
  })
}


calendarControllers.getCalendarsByUser = (req, res, next) => {
  const text = 'SELECT * FROM user_calendars WHERE user_id = $1';
  const values = [req.body.userID] // WILL BE DIFFERENT req.body IN REALITY
  db.query(text, values, (err, result) =>{
    if (err){
      const error = {log: `ERROR occured on "getCalendarsByUser" middleware with req.body.userID = ${req.body.userID}`, status: 500, message: "an error occured retrieving all of your calendars, please refresh and try again"}
      return next(error)
    }
    else{
      result.rows.forEach(cal => {
        //AGAIN, we need to iterate over all of the calendars in row, and do a query run for each calendar_id, and grabs the name of each 
      })

      res.locals.calendarsByUser = result.rows;
      return next();
    }
  })
}



//if req.body has prop (= certain condition has been met and there's a value sent) --> we send it as JSON (object)
calendarControllers.editCalendar = (req, res, next) => {
  //WHAT DO WE NEED TO CHANGE.. nothing? the events are stored separately - does the calendar really not know they exist?
}



calendarControllers.deleteCalendar = (req, res, next) => {
}//when a user hits "delete" on the calendar, and they are the last one --> we should eithe have a second button pop up that says "ARE YOU SURE?" (and maybe we could even save it in a cache or locally for them until some expiration... since they may want to retrieve it after deleted at some point)

//ALSO has to run the query 'DELETE FROM events WHERE calendar_id = req.body.calendar' //THIS WILL CHANGE based on what the req.body actually is..
//ALSO the join table? YES --> 'DELETE FROM user_calendars WHERE calendar_id = req.body.calendar' ......something else for req.body



export default calendarControllers