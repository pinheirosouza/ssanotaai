const pageModel = require("../../../models/pageModel");

module.exports = pageServices = {
  /**
   * @name createPage - cria cadastro de uma página no sistema
   *
   * @param {String} name - nome da página
   *
   * @returns {Promise}
   */
  createPage: (name) => {
    console.log(name);
    return new Promise((resolve, reject) => {
      let r = Math.random().toString(36).substring(7);
      if (name) {
        new pageModel({
          name,
          whoDisabled: {
            user: null,
            date: null,
          },
          nameId: r,
        })
          .save()
          .then((page) => {
            resolve(page);
            pageServices.updateNameId(page._id, name);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject(false);
      }
    });
  },

  updateNameId: (pageId, nameId) => {
    var nameId = removeDiacritics(nameId);
    nameId = nameId.replace(/ /g, "");
    nameId = nameId.replace(/[!#.'+}\;/{?=]/g, "");

    pageServices.verifyNotExist(pageId, nameId, 0, function (res) {
      if (res.success) {
        var promise = pageModel
          .findOneAndUpdate(
            {
              _id: pageId,
            },
            {
              nameId: res.nameId,
            }
          )
          .exec();
        promise
          .then(function (res) {})
          .catch(function (err) {
            console.log(err);
          });
      } else {
        console.log(nameId);
      }
    });
  },

  verifyNotExist: (pageId, nameId, index, callback) => {
    var regex = new RegExp(["^", nameId, "$"].join(""), "i");

    var promise = pageModel
      .find({
        nameId: regex,
      })
      .exec();
    promise
      .then(function (data) {
        if (data && data.length > 0) {
          if (index == 0) {
            index++;
          }

          nameId = nameId + index;
          pageServices.verifyNotExist(pageId, nameId, index, callback);
        } else {
          callback({
            success: true,
            nameId: nameId,
          });
        }
      })
      .catch(function (err) {
        console.log(err);
        callback({
          success: false,
        });
      });
  },
};
