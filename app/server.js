const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.initServer = function () {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.get("/", function (req, res) {
    res.sendFile("index.html", { root: __dirname });
  });
};

app.addRoutes = function (routePath, routes) {
  if (routePath) app.use(routePath, routes);
  else app.use(routes);
};

module.exports = app;
