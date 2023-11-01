const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = 3000;

const calendarRoute = require('./routes/calendarRoute');
const userRoute = require('./routes/userRoute');
const eventRoute = require('./routes/eventRoute');

const {} = require('calendarControllers');
const {} = require('userControllers');
const {} = require('eventControllers');

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/globals.css', express.static(path.join(__dirname, '../client/globals.css')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


app.use('/calendar', calendarRoute);
app.use('/user', userRoute);
app.use('/event', eventRoute);





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
