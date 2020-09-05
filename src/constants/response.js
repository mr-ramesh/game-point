module.exports = {
    SUCCESS: {
      message: "Done!",
      code: 200
    },
    BAD_REQUEST: {
      message: "Invalid request data!",
      code: 400
    },
    FORBIDDEN: {
      message: "Please login to proceed!",
      code: 403
    },
    USER_EXISTS: {
      message: "User already exists! Please use different name id to register.",
      code: 409
    },
    UN_AUTHORIZED: {
        message: "You're not authorized to do this operation",
        code: 401
    },
    SERVER_ERROR:  {
      message: "Sorry, We're facing temprovary failure. Please try again later",
      code: 500
    },
  };
  