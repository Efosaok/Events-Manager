// require all dependencies
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.

app.set('secret', process.env.SECRET);
app.set('port', process.env.PORT || 3000);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// fire up server to listen on ap particular port
app.listen(app.get('port'), () => {
  console.log(`api running on port ${app.get('port')}`);
});

module.exports = app;
