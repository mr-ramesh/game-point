const TokenRepository = require("../repository/das/TokenRepository");

exports.tokenValidator = async function (req, res, next) {
  console.log("[Interceptor] [tokenValidator] processing...");
  let authHeader = req.headers["auth"];
  let token =
    authHeader && authHeader.split(" ")[1] ? authHeader.split(" ")[1] : null;
  token = token ? token : req.cookies["AuthToken"];
  if (token) {
    let user = await TokenRepository.validateToken(token);
    req.user = user;
  }
  next();
};

exports.jwtFilter = async function (req, res, next) {
  console.log("[Interceptor] [jwtFilter] processing...");
  if (req.user) {
    console.log("req user ... ", req.user);
    return next();
  } else {
    res.status(403).json({
      message: "Please login to continue!",
    });
  }
};
