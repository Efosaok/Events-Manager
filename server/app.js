import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import webpack from 'webpack';
import winston from 'winston';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import centerRoutes from './routes/centers';
import userRoutes from './routes/users';
import eventRoutes from './routes/events';
import webpackConfig from '../webpack.config';
import webpackConfigProd from '../webpack.config.prod';
import swaggerDocument from '../swagger.json';

dotenv.config();

// Set up the express app
const app = express();
let compiler;
if (process.env.NODE_ENV === 'development') {
  compiler = webpack(webpackConfig);
} else {
  compiler = webpack(webpackConfigProd);
}

// Log requests to the console.
app.use(logger('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
// Setup a default catch-all route that sends
// back a welcome message in JSON format.
userRoutes(app);
centerRoutes(app);
eventRoutes(app);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use((req, res) => res.status(404).send({ error: 'url not valid' }));

app.set('port', process.env.PORT || 3000);

// fire up server to listen on ap particular port
app.listen(app.get('port'), () => {
  winston.log(`api running on port ${app.get('port')}`);
});

export default app;
