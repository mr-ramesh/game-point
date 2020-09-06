const serverless = require('serverless-http');

const fs = require('fs');
const ini = require('ini');

const config = ini.parse(fs.readFileSync('./config.ini', 'utf8'));
const environment = ini.parse(fs.readFileSync(`${config.env.prefix + config.env.value}.ini`, 'utf8'));

//database init
const db_connector = require('./src/repository/connector');
const connection = new db_connector(environment.db).getConnection();

const commonRoutes = require('./src/controller/common');
const securityRoutes = require('./src/controller/security');
const interceptor = require('./src/controller/interceptor');
const gameRoutes = require('./src/controller/game');
const exceptionHandler = require('./src/exception/ExceptionHandler');

//server init
const server = require('./server');
server.init(environment);
server.addRoutes(null, interceptor.tokenValidator);
server.addRoutes(null, securityRoutes);
server.addRoutes(null, commonRoutes);
server.addRoutes(null, interceptor.jwtFilter);
server.addRoutes("/game", gameRoutes);
server.addRoutes(null, exceptionHandler.handler);

module.exports.handler = serverless(server.app);