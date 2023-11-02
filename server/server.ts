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
// const GoogleStrategy = require('passport-google-oidc');


const bcrypt = require('bcrypt');

const initializePassport = require('./passport.config')

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = [];

app.use(express.urlencoded({extended : false}))
app.use(flash())
app.use(express.json());
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

app.get('/',checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.get('/home',checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// app.get('/login/federated/google', passport.authenticate('google'));


// app.get('/login',checkNotAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist', 'index.html'));

// });

app.get('/',checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));

});

// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true
// }))

app.post('/', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
}))

app.get('/register',checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id : Date.now().toString(),
      email : req.body.email,
      password : hashedPassword
    })

    // res.redirect('/login')
    res.redirect('/')
  } catch (error) {
    res.redirect('/register')
  }
  console.log(users);

});

app.delete('/logout', (req, res) => {
  // Perform any necessary cleanup or additional actions before logging out
  // ...

  // Use req.logOut with a callback function
  req.logOut((err) => {
    if (err) {
      // Handle any error that occurred during logout
      console.error(err);
      return res.status(500).send('Error logging out');
    }

    // Redirect the user to the login page after successful logout
    // res.redirect('/login');
    res.redirect('/');
  });
});


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  // res.redirect('/login')
  res.redirect('/')

}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

// GLOBAL ERROR HANDLER
app.use((req, res) => res.status(404).send("This is not the page you're looking for..."));

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
