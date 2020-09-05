const UserModel = require("../model/UserDetails");
const BaseCRUDRepository = require("./BaseCRUDRepository");

class UserRepository {
  constructor(model) {
    model = model ? model : UserModel;
    this.curdRepository = new BaseCRUDRepository(model);
  }

  getUser(filter) {
    return new Promise(async (resolve, reject) => {
      await this.curdRepository
        .read(filter)
        .then((resp) => resolve(resp[0]))
        .catch((err) => reject(err));
    });
  }

  getAllUsers() {
    return new Promise(async (resolve, reject) => {
      await this.curdRepository
        .read()
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  }

  updateUser(filter, dataToBeUpdated) {
    return new Promise(async (resolve, reject) => {
      await this.curdRepository
        .update(filter, dataToBeUpdated)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  }
}

module.exports = UserRepository;
