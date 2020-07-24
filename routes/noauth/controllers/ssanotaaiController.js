const userServices = require("../services/userServices");
const pageServices = require("../services/pageServices");
const establishmentServices = require("../services/establishmentServices");

module.exports = userController = {
  createUser: (req, res, next) => {
    req.register = {};
    let { name, email, phone, cpf, birthDate, address } = req.body;

    userServices
      .createUser(name, email, phone, cpf, birthDate, address)
      .then((user) => {
        req.register.user = user;
        next();
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
  createPage: (req, res, next) => {
    let pageName = req.body.pageName;
    pageServices
      .createPage(pageName)
      .then((page) => {
        req.register.page = page;
        next();
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
  createEstablishment: (req, res, next) => {
    let pageId = req.register.page._id;

    establishmentServices
      .createEstablishment(pageId)
      .then((establishment) => {
        req.register.establishment = establishment;
        next();
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
