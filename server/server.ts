if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = 3001;
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
import database from './database';

const calendarRoute = require('./routes/calendarRoute');
const userRoute = require('./routes/userRoute');
const eventRoute = require('./routes/eventRoute');


app.use(express.urlencoded({extended : false}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/globals.css', express.static(path.join(__dirname, '../client/globals.css')))




app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// LOGIN
app.post('/', async (req,res) => {

  const loginQuery = `SELECT * FROM users WHERE username = '${req.body.email}'`
  const result = await database.query(loginQuery)
  const account = result.rows[0];
  if (!account) {
    return res.status(201).redirect('/');
  }

  console.log(account);

  if (bcrypt.compare(req.body.password, account.password)){
    res.cookie('user_id', account.id);
    res.status(201).redirect('/home');
  } else { return res.status(201).redirect('/'); }

})


app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
   
    const username = req.body.email;
    
    let sent = `INSERT INTO users(username, password) VALUES ($1, $2)`
    let val = [username, hashedPassword]
    database.query(sent, val)

    res.redirect('/')
  } catch (error) {
    res.redirect('/register')
  }

});

app.post('/logout', (req,res) =>{
  res.status(201).redirect('/');
})


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
