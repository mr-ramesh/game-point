const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.initServer = function (config) {
  this.config = config;
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.get("/", function (req, res) {
    res.sendFile("index.html", { root: __dirname });
  });
  startServer(config.server.port);
};

app.addRoutes = function (routePath, routes) {
  if (routePath) app.use(routePath, routes);
  else app.use(routes);
};

function startServer(port) {
  try {
    app.listen(port, () =>
      console.info(`Server started with port  ${port} up and running...`)
    );
  } catch (error) {
    console.error(`Unable to start the server, error: ${error}`);
  }
}

module.exports = app;
