const responseConstants = require("../../constants/response");

class BaseCRUDRepository {
  constructor(model) {
    this.model = model;
  }

  create(docData) {
    console.debug("[BaseCRUDRepository] [create] with input : ", JSON.stringify(docData));
    return new Promise(async (resolve, reject) => {
      await this.model.collection.insertMany(
        docData,
        { useFindAndModify: true },
        (err, docs) => {
          if (err) reject(responseConstants.SERVER_ERROR);
          resolve(responseConstants.SUCCESS);
        }
      );
    });
  }

  read(filter = {}) {
    console.debug("[BaseCRUDRepository] [read] with input : ", JSON.stringify(filter));
    return new Promise(async (resolve, reject) => {
      await this.model.find(filter, (err, docs) => {
        if (err) reject(responseConstants.SERVER_ERROR);
        try {
          docs = docs ? docs.toJSON({ getters: true }) : {};
        } catch (err) {}
        resolve(docs);
      });
    });
  }

  readOne(filter) {
    console.debug("[BaseCRUDRepository] [readOne] with input : ", JSON.stringify(filter));
    return new Promise(async (resolve, reject) => {
      await this.model.findOne(filter, (err, docs) => {
        if (err) reject(responseConstants.SERVER_ERROR);
        try {
          docs = docs ? docs.toJSON({ getters: true }) : {};
        } catch (err) {}
        resolve(docs);
      });
    });
  }

  update(filter, dataToUpdate) {
    console.debug(`[BaseCRUDRepository] [update] with filter ${filter} & input ${dataToUpdate}`);
    return new Promise(async (resolve, reject) => {
      try {
        let doc = await this.model.findOneAndUpdate(filter, dataToUpdate, {
          new: true,
        });
        resolve(doc);
      } catch (error) {
        reject(responseConstants.SERVER_ERROR);
      }
    });
  }

}

module.exports = BaseCRUDRepository;
