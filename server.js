const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

module.exports = {
  app,
  init(config) {
    this.config = config;
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.get('/',function(req,res) {
      res.sendFile('index.html', { root: __dirname });
    });
    this.startServer();
    return this;
  },

  startServer() {
    try {
      app.listen(this.config.server.port, () =>
        console.info(
          `Server started with port  ${this.config.server.port} up and running...`
        )
      );
    } catch (error) {
      console.error(`Unable to start the server, error: ${error}`);
    }
    return this;
  },

  addRoutes(routePath, routes) {
    if (routePath) app.use(routePath, routes);
    else app.use(routes);
  }
};
