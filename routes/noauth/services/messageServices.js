var messageModel = require("../../../models/messageModel");

var createMessages = function (pageid) {
  return messageModel
    .findOneAndUpdate(
      {
        page: pageid,
      },
      {
        page: pageid,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    .exec();
};

module.exports = {
  createMessages,
};
