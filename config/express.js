const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const consign    = require('consign');
const logger     = require('morgan');

module.exports = () => {
  const app = express();

  app.set('secretKey', 'nodeRestApi'); 
  app.set('port', process.env.PORT || config.get('server.port'));

  app.use(bodyParser.json());

  app.use(logger('dev'));
  
  consign({cwd: 'api'})
    .then('data')
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};