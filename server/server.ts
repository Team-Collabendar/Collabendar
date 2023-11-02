if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = 3001;
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const bcrypt = require('bcrypt');
const initializePassport = require('./passport.config')
import database from './database';

const calendarRoute = require('./routes/calendarRoute');
const userRoute = require('./routes/userRoute');
const eventRoute = require('./routes/eventRoute');


// initializePassport(
//   passport,
//   email =>  users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// )
// initializePassport(
//   passport,
//   async (email) => {
//         const user = await database.query(`SELECT * FROM users WHERE username = '${email}'`);
//         return user.rows[0].username; 
//       },
//   id => users.find(user => user.id === id)
// )

// async function test (){
//   const emailArr = await database.query(`SELECT * FROM users WHERE username = '${email}'`)
//   console.log(emailArr.rows[0].username);
//   return emailArr.rows[0].username
// }
// test();

// initializePassport(
//   passport,
//   async (email) => {
//     const user = await database.query(`SELECT * FROM users WHERE username = '${email}'`);
//     return user.rows[0].username; // Assuming the first row is the user
//   },
//   (id) => {
//     // Replace this with your actual logic to find a user by their ID
//     return users.find((user) => user.id === id);
//   }
// );



initializePassport(
  passport,
  email =>  users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
const users = [];


app.use(express.urlencoded({extended : false}))
app.use(flash())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, '../dist')));
app.use('/globals.css', express.static(path.join(__dirname, '../client/globals.css')))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, async (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


app.get('/home',checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});



//ROUTES --> to where the routes actually live / middleware is run (see imports above)
app.use('/calendar', calendarRoute);
app.use('/user', userRoute);
app.use('/event', eventRoute);



// GLOBAL ERROR HANDLER
app.get('/',checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));

});


app.post('/', checkNotAuthenticated, passport.authenticate('local',  {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
})
)


app.get('/register',checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
   
    const username = req.body.email;
    
    let sent = `INSERT INTO users(username, password) VALUES ($1, $2)`
    let val = [username, hashedPassword]
    database.query(sent, val)
    

    users.push({
      id : Date.now().toString(),
      email : req.body.email,
      password : hashedPassword
    })

    res.redirect('/')
  } catch (error) {
    res.redirect('/register')
  }
  console.log(users);

});

app.delete('/logout', (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/');
  });
});


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')

}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}


// GLOBAL ROUTE HANDLER
app.use((req, res) => res.status(404).send("This is not the page you're looking for..."));


// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log('ERROR HERE: ', err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = { app };
