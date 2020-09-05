const RDCException = require("./RDCException");

let exceptionHandler = function (err, req, res, next) {
  
  if (err) {
    let code, message;
    if (err instanceof RDCException) {
      code = err.statusCode;
      message = err.message;
    }
    console.log("Err : ", err)
    code = code ? code : 500;
    message = message ? message : "Server error!";
    res.status(code).json({ code, message });
  }
};

exports.handler = exceptionHandler;
