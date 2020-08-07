const userServices = require("../services/userServices");

module.exports = userController = {
  createUser: (req, res) => {
    let { name, email, phone, cpf, birthDate, address } = req.body;

    userServices
      .createUser(name, email, phone, cpf, birthDate, address)
      .then((user) => {
        res.json({
          success: true,
          data: user,
        });
      })
      .catch((err) => {
        console.log(err);
        Sentry.captureException(err); // envia o stack do erro
        res.json({
          success: false,
          message: err,
        });
      });
  },
};
