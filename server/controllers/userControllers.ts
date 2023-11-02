import db from '../database'

const userControllers: any = {}



userControllers.createUser = (req, res, next) => {
//IF(some req.body.name exists){.......}
  let text = 'INSERT INTO user(userName, password) VALUES($1,$2) RETURNING *'
  let values = [req.body.userName, ]
  db.query(text, values, (err, result)=> {
    if (err){
      const error = {log: `ERROR occured on "createUser" middleware with req.body.username = ${req.body.cal}`, status: 500, message: "an error occurred! That email may already be taken"}
      return next(error)
    }
    else{
        res.locals.newUser = result.rows[0]
    }
  }) 
}

//NEED TO --> add user to our bridge table for users / calendars
userControllers.getUser = (req, res, next) => {

}



//if req.body has prop (= certain condition has been met and there's a value sent) --> we send it as JSON (object)
userControllers.editUser = (req, res, next) => {
//if they want to edit something on their profile
}





userControllers.deleteUser = (req, res, next) => {
}//when a user hits "delete" on their account.... 



export default userControllers