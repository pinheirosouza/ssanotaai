const { makeRequest } = require("../services/chat-api-api");

module.exports = {
  /**
   * @name adviceProspectionToCloser - avisa sdr que uma página foi prospectada
   *
   * @param {String} closerName - qual sdr receberá o aviso
   * @param {Object} info - informações que serão enviadas ao sdr junto com a mensagem
   *
   */
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
