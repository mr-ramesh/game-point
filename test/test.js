const sinon = require("sinon");
const { assert } = require("chai");
const request = require("request");

const UserRepository = require("../src/repository/das/UserRepository");
const BaseSecurityRepository = require("../src/repository/das/BaseSecurityRepository");
const TokenRepository = require("../src/repository/das/TokenRepository");
const StubData = require("./stub");

let options = {
  auth: {
    bearer: TokenRepository.generateToken(StubData.postiveUser),
  },
  resolveWithFullResponse: true,
};

let reqOptions = {
  headers: {
    Authorization:
      "Bearer " + TokenRepository.generateToken(StubData.postiveUser),
  },
  rejectUnauthorized: false,
};

let host = "http://localhost:666/";
let nowUrl = host + "now";
let registerURL = host + "register";
let loginURL = host + "login";
let meURL = host + "me";
let playURL = host + "game/play";
let claimURL = host + "game/claim_bonus";
let leaderURL = host + "leaderboard";

describe("Anonymous functionalities test", () => {
  describe("Postivie Scenarios", () => {
    before(() => {
      sinon
        .stub(UserRepository.prototype, "getUser")
        .returns(StubData.postiveUser);
      sinon
        .stub(UserRepository.prototype, "getAllUsers")
        .returns(StubData.allUsers);
      sinon
        .stub(UserRepository.prototype, "updateUser")
        .returns(StubData.negativeUser);
      sinon
        .stub(BaseSecurityRepository.prototype, "register")
        .returns(StubData.postiveUser);
      sinon
        .stub(BaseSecurityRepository.prototype, "login")
        .returns(StubData.postiveUser);
    });

    // it("Server current time requst :", () => {
    //   return request.get(nowUrl, options).then((response) => {
    //     assert.equal(response.statusCode, 200);
    //   });
    // });

    it("Server register requst :", () => {
      return request.get((reqOptions.url = registerURL), (err, response) => {
        console.log("resp : ", response.body);
        assert.equal(response.statusCode, 200);
      });
    });

    // it("Server login time requst :", () => {
    //   return request.get(loginURL, options).then((response) => {
    //     assert.equal(response.statusCode, 200);
    //   });
    // });
  });
  describe("Negative Scenarios", () => {});
});

describe("Authurized functionalities test", () => {
  describe("Postivie Scenarios", () => {});
  describe("Negative Scenarios", () => {});
});
