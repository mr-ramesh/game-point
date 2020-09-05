const express = require("express");
const router = express.Router();

const SecurityRepository = require("../repository/das/BaseSecurityRepository");
const repository = new SecurityRepository();

const UserService = require("../service/UserService");

router.post("/register", async (req, res) => {
  let { name, pass } = req.body;  
  await repository
    .register(name, pass)
    .then((resp) => {
      res.status(200).json({
        message: "User registered successfully! Please login to continue.",
      });
    })
    .catch((err) => {
      res.status(200).json({
        message: "User exist already, Please use diffrent name!",
      });
    });
});

router.post("/login", async (req, res) => {
  let { name, pass } = req.body;
  await repository
    .login(name, pass)
    .then((resp) => {
      if (!resp) {
        res.status(200).json({ message: "User not exist. Please register to continue" });
      } else {
        res.cookie("AuthToken", resp);
        res.status(200).json({ message: "User Loggedin Successfully!" });
      }
    })
    .catch((err) => {
      console.log(`[SecurityController] [login] err : ${JSON.stringify(err)}`);
      let code = err && err.code ? err.code : 500;
      if (code === 401) {
        res.status(401).json({
          message: "Email or Password is Invalid!. Please use valid details.",
        });
      } else {
        res.status(code).json(err);
      }
    });
});

router.get("/me", (req, res, next) => {
  UserService.getUserDetails(req.user.name)
    .then((resp) => {
      let points = resp.totalPoints ? resp.totalPoints : 0;
      let avilablePlays = resp.aviablePlays ? resp.aviablePlays : 6;
      let data = {
        name: resp.name,
        totalPoints: points,
        avilablePlayforThisHour: avilablePlays,
      };
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log("Err: ", err);
      res
        .status(500)
        .json(
          "Sorry, We're facing trouble at this moment. Please try again later !"
        );
    });
});

module.exports = router;
