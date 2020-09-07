const mongoose = require("mongoose");
const UserDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalPoints: {
    type: Number,
  },
  aviablePlays: {
    type: Number,
  },
  lastPlayedHour: {
    type: Number,
  },
  registeredDate: {
    type: Date,
    required: true,
  },
  lastClaimedDate: {
    type: Date,
  },
});

const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);

module.exports = UserDetails;
