const axios = require("axios");

module.exports = axiosRequests = {
  makeRequest: (objData) => {
    return new Promise((resolve, reject) => {
      let options;
      options = {
        url:
          "https://eu163.chat-api.com/instance159062/sendMessage?token=illnbmew3emgb3zx",
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        data: objData,
      };
      axios(options)
        .then((resp) => {
          if (resp.data.sent == true) {
            resolve(resp.data);
          } else {
            reject(resp.data);
          }
        })
        .catch((err) => {
          reject({
            success: false,
            err: err,
            message: "erro interno",
          });
        });
    });
  },
};
