const TokenRepository = require("./TokenRepository");
const UserRepository = require("./UserRepository");
const UserCredModel = require("../model/UserCreds");
const UserDetailsModel = require("../model/UserDetails");
const responseConstants = require("../../constants/response");

class BaseSecurityRepository {
  constructor() {
    this.userCredModel = new UserCredModel();
    this.userDetailsModel = new UserDetailsModel();
    this.userRepository = new UserRepository(UserCredModel);
  }

  register(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!(await this.userRepository.getUser({ username: username }))) {
          this.userCredModel.username = username;
          this.userCredModel.password = password;
          this.userCredModel.save();
          this.userDetailsModel.name = username;
          this.userDetailsModel.registeredDate = new Date();
          this.userDetailsModel.save();
          console.debug(
            `[BaseSecurityRepository] [register] user registered successfully !`
          );
          resolve(await this.login(username, password));
        } else {
          reject(responseConstants.USER_EXISTS);
        }
      } catch (error) {
        console.debug(`[BaseSecurityRepository] [register] error : ${error}`);
        reject(responseConstants.SERVER_ERROR);
      }
    });
  }

  login(username, password) {
    return new Promise(async (resolve, reject) => {
      await UserCredModel.findOne({ username: username })
        .then((user) => {
          if (user) {
            try {
              user = user.toJSON({ getters: true });
            } catch (err) {}
            if (user.password === password) {
              UserDetailsModel.findOne({ name: username }).then((resp) => {
                try {
                  resp = resp.toJSON({ getters: true });
                } catch (err) {}
                TokenRepository.generateToken(resp).then((res) => {
                  resolve(res);
                });
              });
            } else {
              reject(responseConstants.UN_AUTHORIZED);
            }
          } else {
            resolve(null);
          }
        })
        .catch((err) => {
          reject(responseConstants.SERVER_ERROR);
        });
    });
  }
}

module.exports = BaseSecurityRepository;
