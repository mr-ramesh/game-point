const serverless = require("serverless-http");

const fs = require("fs");
const ini = require("ini");

const config = ini.parse(fs.readFileSync(__dirname + "/config.ini", "utf8"));
const environment = ini.parse(
  fs.readFileSync(`${__dirname + config.env.prefix + config.env.value}.ini`, "utf8")
);

//database init
const db_connector = require("./src/repository/connector");
const connection = new db_connector(environment.db).getConnection();

const commonRoutes = require("./src/controller/common");
const securityRoutes = require("./src/controller/security");
const interceptor = require("./src/controller/interceptor");
const gameRoutes = require("./src/controller/game");
const exceptionHandler = require("./src/exception/ExceptionHandler");

//server init
const app = require("./server");
app.initServer(environment);
app.addRoutes("/.netlify/functions/server", (req, res, next) => next());
app.addRoutes(null, interceptor.tokenValidator);
app.addRoutes(null, securityRoutes);
app.addRoutes(null, commonRoutes);
app.addRoutes(null, interceptor.jwtFilter);
app.addRoutes("/game", gameRoutes);
app.addRoutes(null, exceptionHandler.handler);

module.exports = app;
module.exports.handler = serverless(app);
