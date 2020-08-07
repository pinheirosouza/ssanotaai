var request = require("request");
const SAFE2PAY_TOKEN = process.env.SAFE2PAY_TOKEN || config.safe2pay.token;
var establishmentModel = require("../../../models/establishmentModel");

var generatePayment = function (object) {
  var options = {
    method: "POST",
    url: "https://payment.safe2pay.com.br/v2/Payment",
    headers: {
      "x-api-key": SAFE2PAY_TOKEN,
      "content-type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    options.body = JSON.stringify(object);
    request(options, (error, body) => {
      if (error) {
        reject({
          success: false,
          message: error,
        });
      } else {
        var data = JSON.parse(JSON.stringify(body));

        if (data.HasError) {
          reject({
            success: false,
            data: [],
            message: data.Error,
          });
        } else {
          resolve({
            success: true,
            data: data,
          });
        }
      }
    });
  });
};

var cancelPaymentOnline = function (id_transaction, token, callback) {
  var options = {
    method: "DELETE",
    url: "https://api.safe2pay.com.br/v2/CreditCard/Cancel/" + id_transaction,
    headers: {
      "x-api-key": token,
      "content-type": "application/json",
    },
  };

  request(options, function (error, response, body) {
    if (error) {
      console.log(error);
      callback({ success: false, err: error });
    } else {
      var data = JSON.parse(body);
      if (data.HasError) {
        callback({ success: false, data: [], message: data.Error });
      } else {
        if (data.ResponseDetail.isCancelled) {
          callback({ success: true, data: data });
        } else {
          callback({
            success: false,
            data: data,
            message: data.ResponseDetail.Message,
          });
        }
      }
    }
  });
};

var createSubAccountMarketingPlace = function (object, callback) {
  var options = {
    method: "POST",
    url: "https://api.safe2pay.com.br/v2/Marketplace/Add",
    headers: {
      "x-api-key": SAFE2PAY_TOKEN,
      "content-type": "application/json",
    },
  };

  options.body = JSON.stringify(object);

  request(options, function (error, response, body) {
    if (error) {
      Sentry.captureException(error);
      callback({ success: false, err: error });
    } else {
      var data = JSON.parse(body);
      if (data.HasError) {
        Sentry.captureMessage(data.Error);
        callback({ success: false, data: [], message: data.Error });
      } else {
        callback({ success: true, data: data });
      }
    }
  });
};

var getEstablishmentToken = function (page) {
  return new Promise((resolve, reject) => {
    if (page) {
      const establishmentToken = establishmentModel
        .findOne({ page: new ObjectId(page) })
        .select("_id name safe2pay")
        .lean();
      resolve(establishmentToken);
    } else {
      reject(false);
    }
  });
};

var generateCreditcardToken = function (object) {
  var options = {
    method: "POST",
    url: "https://payment.safe2pay.com.br/v2/token",
    headers: {
      "x-api-key": SAFE2PAY_TOKEN,
      "content-type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    options.body = JSON.stringify(object);

    request(options, (error, body) => {
      if (error) {
        reject({
          success: false,
          message: error,
        });
      } else {
        var data = JSON.parse(body.body);
        if (data.HasError) {
          reject({
            success: false,
            data: [],
            message: data.Error,
          });
        } else {
          resolve({
            success: true,
            data: data,
          });
        }
      }
    });
  });
};

module.exports = {
  generatePayment,
  generateCreditcardToken,
  createSubAccountMarketingPlace,
  getEstablishmentToken,
  cancelPaymentOnline,
};
