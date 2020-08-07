const { makeRequest } = require("../services/chat-api-api");

module.exports = {
  sendWhats: (telefone, mensagem) => {
    return new Promise((resolve, reject) => {
      const obj = {
        phone: telefone,
        body: mensagem,
      };

      makeRequest(obj)
        .then((sendMsg) => {
          resolve(sendMsg);
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
