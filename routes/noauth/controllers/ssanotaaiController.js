const userServices = require("../services/userServices");
const pageServices = require("../services/pageServices");
const establishmentServices = require("../services/establishmentServices");
const messageServices = require("../services/messageServices");
const plansServices = require("../services/planServices")
const salesServices = require("../services/salesServices")

module.exports = userController = {
  createUser: (req, res, next) => {
    req.register = {};
    let { name, email, phone, cpf, birthDate, address } = req.body;
    let normalizeCpf = cpf.replace(/\D/g, "");
    //let normalizeCep = address.postalCode.replace(/\D/g, "");
    let normalizePhone = phone.replace(/\D/g, "");
    let normalizeBirth = moment(new Date(birthDate)).format("DD/MM/YYYY");
    userServices
      .createUser(name, email, normalizePhone, normalizeCpf, normalizeBirth, address)
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
    const pageName = req.body.pageName;
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
  createMessage: (req, res, next) =>{
    const pageId = req.register.page._id
    messageServices.createMessages(pageId).then(()=>{
      next()
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
    const pageId = req.register.page._id;

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
  updateEstablishmentUserId: (req, res, next) => {
    let userId = req.register.user._id;
    let pageId = req.register.page._id;
    let cpf_cnpj = req.register.user.cpf;

    establishmentServices
      .getEstablishmentByPage(pageId)
      .then((establishment) => {
        req.register.establishment = establishment;

        let establishmentId = establishment.id;
        establishmentServices
          .updateEstablishmentUserId(establishmentId, userId, cpf_cnpj)
          .then(() => {
            next();
          })
          .catch((err) => {
            console.log(err);
            Sentry.captureException(err); // envia o stack do erro
            res.json({
              success: false,
              message: err.message,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        Sentry.captureException(err); // envia o stack do erro
        res.json({
          success: false,
          message: err.message,
        });
      });
  },
  createSale: (req, res, next) => {
    const pageId = req.register.page._id;
    const planId = req.body.plan_id;
    const userId = req.register.user._id;
    const establishmentId = req.register.establishment.id;

    let totalModules = [];
    let totalDiscount = [];

    let {
      max_parcel,
      value_plan,
      membershipFee,
      discount,
      status,
      closer,
      comments,
      modulesArray,
    } = req.body;

    for (let i = 0; i < modulesArray.length; i++) {
      totalModules.push(parseInt(modulesArray[i].value));
    }
    for (let i = 0; i < discount.length; i++) {
      totalDiscount.push(parseInt(discount[i].value));
    }

    plansServices
      .getPlanById(planId)
      .then((plan) => {
        let modulesSum = totalModules.reduce((a, b) => a + b, 0);
        let discountSum = totalDiscount.reduce((a, b) => a + b, 0);
        let saleTotal =
          plan.price + membershipFee + (modulesSum * plan.period) - discountSum;
          salesServices
          .createSale(
            pageId,
            planId,
            establishmentId,
            userId,
            max_parcel,
            value_plan,
            membershipFee,
            discount,
            modulesArray,
            status,
            saleTotal,
            comments,
            closer
          )
          .then((sale) => {
            res.json({
              success: true,
              info: {
                link: urlBasePayment + "/payment/" + sale.newSale._id,
              },
            });
            mail.sendAnotaAiClient({
              name: req.register.user.name,
              link: urlBasePayment + "/payment/" + sale.newSale._id,
              email: req.register.user.email,
            });
          })
          .catch((err) => {
            console.log(err);
            Sentry.captureException(err); // envia o stack do erro
            res.json({
              success: false,
              message: "Erro ao criar a venda" || err.message,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        Sentry.captureException(err); // envia o stack do erro
        res.json({
          success: false,
          message: "Erro ao criar a venda" || err.message,
        });
      });

  },
  listPlans: (req,res) =>{
    plansServices.getAllPlans().then((plans)=>{
      res.json({
        success: true,
        info: plans
      })
      .catch((err) => {
        console.log(err);
        Sentry.captureException(err); // envia o stack do erro
        res.json({
          success: false,
          message: err.message,
        });
      });
    }) 
  }

};
