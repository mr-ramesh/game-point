const express = require("express");
const router = express.Router();

const UserService = require("../service/UserService");

const response = require("../constants/response");

router.post("/play", (req, res) => {
  try {
    UserService.getUserDetails(req.user.name).then((resp) => {
      let currentHour = new Date().getHours();

      if (resp.aviablePlays > 0 || currentHour != resp.lastPlayedHour) {
        let points_added = Math.floor(Math.random() * 100) + 1;
        let points_total = resp.totalPoints
          ? resp.totalPoints + points_added
          : points_added;
        let avilablePlays = resp.aviablePlays ? resp.aviablePlays - 1 : 5;

        let dataToUpdate = {
          totalPoints: points_total,
          aviablePlays: avilablePlays,
          lastPlayedHour: new Date().getHours(),
        };

        UserService.updateUserDetails(req.user.name, dataToUpdate).then(
          (user) => {
            let data = {
              name: user.name,
              points_added: points_added,
              points_total: user.totalPoints,
              avilablePlayforThisHour: user.aviablePlays,
            };
            res.status(response.SUCCESS.code).json(data);
          }
        );
      } else {
        if (currentHour < 12) {
          currentHour = currentHour + 1 + ":00 am";
        } else if (currentHour < 23) {
          currentHour = ((currentHour + 1) - 12)  + ":00 pm";
        } else if (currentHour === 23) {
          currentHour = "12:00 am";
        } else if (currentHour === 24) {
          currentHour = "1:00 am";
        }

        res.status(response.SUCCESS.code).json({
          message: `Your allowed play times over for this hour.Please come after ${currentHour}`,
        });
      }
    });
  } catch (err) {
    res.status(response.SERVER_ERROR.code).json(response.SERVER_ERROR);
  }
});

router.post("/claim_bonus", (req, res) => {
  try {
    UserService.getUserDetails(req.user.name).then((user) => {
      let points_total = user.totalPoints ? user.totalPoints : 0;
      let lastClaimedDate = user.lastClaimedDate
        ? user.lastClaimedDate
        : user.registeredDate;
      let currentDate = new Date();
      let totalMinutes = Math.round(
        (currentDate - lastClaimedDate) / 1000 / 60
      );
      let bonusPoints = totalMinutes * 10;
      bonusPoints = bonusPoints < 100 ? bonusPoints : 100;
      points_total = points_total + bonusPoints;
      let dataToUpdate = {
        totalPoints: points_total,
        lastClaimedDate: currentDate,
      };

      UserService.updateUserDetails(req.user.name, dataToUpdate).then(
        (user) => {
          let data = {
            name: user.name,
            points_added: bonusPoints,
            points_total: user.totalPoints,
          };
          res.status(response.SUCCESS.code).json(data);
        }
      );
    });
  } catch (err) {
    res.status(response.SERVER_ERROR.code).json(response.SERVER_ERROR);
  }
});

module.exports = router;
