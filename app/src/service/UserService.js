const UserRepository = require("../repository/das/UserRepository");
const userRepository = new UserRepository();

class UserService {
  static getUserDetails(name) {
    console.debug('[UserService] [getUserDetails] input : ', name);
    return new Promise((resolve, reject) => {
      userRepository
        .getUser({ name: name })
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    });
  }

  static getAllUserDetails() {
    console.debug('[UserService] [getUserDetails]');
    return new Promise((resolve, reject) => {
      userRepository
        .getAllUsers()
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    });
  }

  static updateUserDetails(name, dataToUpdate) {
    console.debug('[UserService] [updateUserDetails] input : ', name);
    return new Promise((resolve, reject) => {
      userRepository
        .updateUser({ name: name }, dataToUpdate)
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    });
  }
}

module.exports = UserService;
