const express = require("express");
const CommonRoutes = express.Router();
const UserService = require("../service/UserService");

CommonRoutes.get("/now", (req, res, next) => {
  res
    .status(200)
    .send(
      `<h3 style="padding-top:20%;text-align:center;font-size: 50px"> Current Time is : ${Date.now()}</h3>`
    );
});

CommonRoutes.get("/leaderboard", (req, res, next) => {
  UserService.getAllUserDetails()
    .then((resp) => {
      let sortedUsers = resp.sort(
        (user1, user2) => user1.totalPoints - user2.totalPoints
      );
      let leaders = sortedUsers
        .slice(0, 11)
        .map((user) => ({ name: user.name, points: user.totalPoints }));

      let response = { leaders };

      if (req.user) {
        let uname = req.user.name;
        sortedUsers.forEach((user, index) => {
          if ((user.name = uname)) {
            response.currentPosition = index + 1;
            return;
          }
        });
      }
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log("err : ", err);
      res.status(500).json("System error");
    });
});

module.exports = CommonRoutes;
