const sendMsg = require("../services/sendMsg");

module.exports = {
  sendMsgToVendor: (req, res) => {
    const { telefone, mensagem } = req.body;

    sendMsg
      .sendWhats(telefone, mensagem)
      .then((sendMsg) => {
        res.json({
          success: true,
          msg: sendMsg,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          err: err,
          message: "erro interno",
        });
      });
  },
};
