const mongoose = require("mongoose");
const UserCredsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserCredsModel = mongoose.model("UserCreds", UserCredsSchema);

module.exports = UserCredsModel;
