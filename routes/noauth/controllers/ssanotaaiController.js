const userServices = require("../services/userServices");
const pageServices = require("../services/pageServices");
const establishmentServices = require("../services/establishmentServices");
const messageServices = require("../services/messageServices");
const plansServices = require("../services/planServices");
const salesServices = require("../services/salesServices");
const modulesServices = require("../services/modulesServices");
const eventSalesService = require("../services/eventSalesService");
const safe2PayService = require("../services/safe2pay-api-service");

const SAFE2PAY_IS_SANDBOX = process.env.ENV_BASE != "production";

const { isValidObjectId } = require("mongoose");

module.exports = userController = {
  //--------------------- Rotina de vendas -------------------------//
  createUser: (req, res, next) => {
    req.register = {};
    let { name, email, phone, cpf, birthDate, address } = req.body;

    let normalizeCpf = cpf.replace(/\D/g, "");
    //let normalizeCep = address.postalCode.replace(/\D/g, "");
    let normalizePhone = phone.replace(/\D/g, "");
    let normalizeBirth = moment(new Date(birthDate)).format("DD/MM/YYYY");

    if (normalizeCpf.length == 11) {
      userServices
        .createUser(
          name,
          email,
          normalizePhone,
          normalizeCpf,
          normalizeBirth,
          address
        )
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
    } else {
      res.json({
        success: false,
        message: "CPF inválido",
      });
    }
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
  createMessage: (req, res, next) => {
    const pageId = req.register.page._id;
    messageServices
      .createMessages(pageId)
      .then(() => {
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
      discount,
      status,
      closer,
      comments,
      modulesArray,
    } = req.body;
    let membershipFee = 200;

    for (let i = 0; i < modulesArray.length; i++) {
      totalModules.push(parseFloat(modulesArray[i].value));
    }
    if (!discount) {
      discount = [
        {
          value: 0,
          description: null,
        },
      ];
    } else {
      for (let i = 0; i < discount.length; i++) {
        totalDiscount.push(parseFloat(discount[i].value));
      }
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
            // mail.sendAnotaAiClient({
            //   name: req.register.user.name,
            //   link: urlBasePayment + "/payment/" + sale.newSale._id,
            //   email: req.register.user.email,
            // });
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

  //----------------------- Rotas individuais -----------------------//
  listPlans: (req, res) => {
    plansServices.getAllPlans().then((plans) => {
      res
        .json({
          success: true,
          info: plans,
        })
        .catch((err) => {
          console.log(err);
          Sentry.captureException(err); // envia o stack do erro
          res.json({
            success: false,
            message: err.message,
          });
        });
    });
  },
  listModules: (req, res) => {
    modulesServices
      .getAll()
      .then((modules) => {
        res.json({
          success: true,
          info: modules,
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
  getSale: (req, res) => {
    let saleId = req.params.saleId;

    if (isValidObjectId(saleId) == true) {
      salesServices
        .getSaleById(saleId)
        .then((sale) => {
          res.json({
            success: true,
            data: sale,
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
    } else {
      res.json({
        success: false,
        message: "Erro ao listar a venda",
      });
    }
  },

  //---------------------- Rotas de pagamento ----------------------//
  verifyPageBySale: (req, res, next) => {
    let saleId = req.params.id;
    req.register = {};

    salesServices
      .getSaleById(saleId)
      .then((data) => {
        if (data) {
          req.register.page = data.page._id;
          next();
        } else {
          res.json({
            success: false,
            message: "Ocorreu um erro, página não encontrada",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Sentry.captureException(err);
        res.json({
          success: false,
          message: "Ocorreu um erro, página não encontrada",
        });
      });
  },
  safe2payCreditCardPayment: (req, res) => {
    let saleId = req.params.id;
    let pageId = req.register.page;
    let cardNumber = req.body.payment_method.cardNumber;
    let lastNumbers = cardNumber.replace(/\d(?=\d{4})/g, "*");

    salesServices
      .getSaleById(saleId)
      .then((sale) => {
        let clientObject = {
          IsSandbox: SAFE2PAY_IS_SANDBOX,
          Application: "ANOTAAI",
          Vendor: sale.closer_name,
          CallbackUrl: "https://callbacks.exemplo.com.br/api/Notify", //urlBasePaymentNotify + "/noauth/sales/callback/payment",
          PaymentMethod: "2",
          Customer: {
            Name: req.body.name,
            Identity: req.body.identity,
            Phone: req.body.phone,
            Email: req.body.email,
            Address: {
              ZipCode: req.body.address.zipCode,
              Street: req.body.address.street,
              Number: req.body.address.number,
              Complement: req.body.address.complement,
              District: req.body.address.district,
              CityName: req.body.address.cityName,
              StateInitials: req.body.address.stateInitials,
              CountryName: req.body.address.countryName,
            },
          },
          Products: [
            {
              Code: "001",
              Description: "Mensalidade Anota AI",
              UnitPrice: sale.total,
              Quantity: 1,
            },
          ],
          PaymentObject: {
            Holder: req.body.payment_method.cardName,
            CardNumber: req.body.payment_method.cardNumber,
            ExpirationDate: req.body.payment_method.dueDate,
            SecurityCode: req.body.payment_method.lastNumbers,
            InstallmentQuantity: req.body.installmentQuantity,
          },
        };
        let payment_method = {
          method: 2,
          cardName: req.body.payment_method.cardName,
          lastNumbers: lastNumbers,
          brand: req.body.payment_method.brand,
          barcode: "",
        };

        safe2PayService
          .generatePayment(clientObject)
          .then((data) => {
            var parsedData = JSON.parse(data.data.body);
            if (parsedData.HasError == false) {
              if (parsedData.ResponseDetail.Status == 3) {
                eventSalesService
                  .createSaleEvent(
                    saleId,
                    pageId,
                    parsedData.ResponseDetail.IdTransaction,
                    parsedData.ResponseDetail.Token,
                    payment_method
                  )
                  .then(() => {
                    res.json({
                      success: true,
                      message: parsedData.ResponseDetail.Description,
                    });
                    // mail.sendCreditCard({
                    //   name: req.body.name,
                    //   email: req.body.email,
                    // });
                  })
                  .catch((err) => {
                    console.log(err);
                    Sentry.captureException(err);
                    res.json({
                      success: false,
                      message: err.message,
                    });
                  });
              } else {
                res.json({
                  success: false,
                  message:
                    parsedData.ResponseDetail.Message +
                    " - " +
                    parsedData.ResponseDetail.Description,
                });
              }
            } else {
              res.json({
                success: false,
                message: parsedData.Error,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Sentry.captureException(err);
            res.json({
              success: false,
              message: err.message,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        Sentry.captureException(err);
        res.json({
          success: false,
          message: err.message,
        });
      });
  },
  safe2payBilletPayment: (req, res) => {
    let saleId = req.params.id;
    let pageId = req.register.page;

    salesServices
      .getSaleById(saleId)
      .then((sale) => {
        let clientObject = {
          IsSandbox: SAFE2PAY_IS_SANDBOX,
          Application: "ANOTAAI",
          Vendor: sale.closer_name,
          CallbackUrl: "https://callbacks.exemplo.com.br/api/Notify", //urlBasePaymentNotify + "/noauth/sales/callback/payment",
          PaymentMethod: "1",
          Customer: {
            Name: req.body.name,
            Identity: req.body.identity,
            Phone: req.body.phone,
            Email: req.body.email,
            Address: {
              ZipCode: req.body.address.zipCode,
              Street: req.body.address.street,
              Number: req.body.address.number,
              Complement: req.body.address.complement,
              District: req.body.address.district,
              CityName: req.body.address.cityName,
              StateInitials: req.body.address.stateInitials,
              CountryName: req.body.address.countryName,
            },
          },
          Products: [
            {
              Code: "001",
              Description: "Mensalidade Anota AI",
              UnitPrice: sale.total,
              Quantity: 1,
            },
          ],
          PaymentObject: {
            DueDate: moment().add(3, "days").format("DD/MM/YYYY"),
            Instruction:
              "Serviço Anota AI informa, seu boleto deve ser pago antes do vencimento.",
            Message: [
              "Boleto válido até a data de vencimento.",
              "Não aceitar o pagamento do boleto após o vencimento.",
              "Após vencimento, entre em contato com o financeiro para obter um novo boleto.",
            ],
            CancelAfterDue: true,
            IsEnablePartialPayment: false,
            DiscountDue: moment().add(3, "days").format("DD/MM/YYYY"),
          },
        };
        safe2PayService
          .generatePayment(clientObject)
          .then((data) => {
            var parsedData = JSON.parse(data.data.body);
            if (parsedData.HasError == false) {
              let payment_method = {
                method: 1,
                barcode: parsedData.ResponseDetail.Barcode,
                paymentLink: parsedData.ResponseDetail.BankSlipUrl,
                dueDate: moment().add(3, "days"),
              };

              eventSalesService
                .createSaleEvent(
                  saleId,
                  pageId,
                  parsedData.ResponseDetail.IdTransaction,
                  "",
                  payment_method
                )
                .then((info) => {
                  res.json({
                    success: true,
                    message: "Boleto gerado com sucesso !",
                    paymentLink: parsedData.ResponseDetail.BankSlipUrl,
                  });
                  // mail.sendBillet({
                  //   name: req.body.name,
                  //   link: info.payment_method.paymentLink,
                  //   email: req.body.email,
                  //   barcode: info.payment_method.barcode,
                  // });
                })
                .catch((err) => {
                  console.log(err);
                  Sentry.captureException(err);
                  res.json({
                    success: false,
                    message: err.message,
                  });
                });
            } else {
              res.json({
                success: false,
                message: parsedData.Error,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Sentry.captureException(err);
            res.json({
              success: false,
              message: err.message,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        Sentry.captureException(err);
        res.json({
          success: false,
          message: err.message,
        });
      });
  },
  setIsCreditCard: (req, res, next) => {
    if (req.register == undefined) {
      req.register = {
        creditcard: true,
      };
    } else {
      req.register.creditcard = true;
    }
    next();
  },
  safe2payValidatePaymentRealized: (req, res, next) => {
    let saleId = req.params.id;
    eventSalesService
      .countEventBySaleRealized(saleId, req.register.creditcard)
      .then((count) => {
        if (count > 0) {
          res.json({
            success: false,
            message: "Esta venda já foi paga ou ainda está em progresso.",
          });
        } else {
          next();
        }
      });
  },
  saleNotify: (req, res, next) => {
    let objectPayment = req.body;
    req.register = {};
    if (objectPayment.IdTransaction) {
      let transactionId = objectPayment.IdTransaction;
      let transactionStatus = objectPayment.TransactionStatus.Code;
      let status = 1;
      safe2payNotifyService
        .paymentNotification(transactionId)
        .then((transaction) => {
          req.register.transaction = transaction;
          if (transaction != null) {
            if (transactionStatus == 3) {
              status = 3;
              let saleId = transaction.sale;
              eventSalesService
                .updateSalveEventBySale(saleId, status)
                .then(() => {
                  salesServices
                    .getSaleById(saleId)
                    .then((sale) => {
                      //salesController.paymentConfirmedRoutine(sale);
                      res.json({
                        success: true,
                        info: sale,
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      Sentry.captureException(err);
                      res.json({
                        success: false,
                        message: err.message,
                      });
                    });
                })
                .catch((err) => {
                  console.log(err);
                  Sentry.captureException(err);
                  res.json({
                    success: false,
                    message: err.message,
                  });
                });
            } else if (
              transactionStatus == 6 ||
              transactionStatus == 7 ||
              transactionStatus == 8 ||
              transactionStatus == 13
            ) {
              status = 4;
              let saleId = transaction.sale;
              eventSalesService
                .updateSalveEventBySale(saleId, status)
                .then(() => {
                  salesServices
                    .getSaleById(saleId)
                    .then((sale) => {
                      mail.cancelation({
                        name: sale.user.name,
                        email: sale.user.email,
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      Sentry.captureException(err);
                      res.json({
                        success: false,
                        message: err.message,
                      });
                    });
                })
                .catch((err) => {
                  console.log(err);
                  Sentry.captureException(err);
                  res.json({
                    success: false,
                    message: err.message,
                  });
                });
            }
            if (status != 1) {
              safe2payNotifyService
                .updatePaymentStatus(transactionId, status)
                .then(() => {
                  res.json({
                    success: true,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  Sentry.captureException(err);
                  res.json({
                    success: false,
                    message: err.message,
                  });
                });
            } else {
              res.json({
                success: false,
              });
            }
          } else {
            res.json({
              success: false,
              message: "Transação não encontrada",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Sentry.captureException(err);
          res.json({
            success: false,
            message: err.message,
          });
        });
    } else {
      res.json({
        success: false,
        message: "Ocorreu um erro desconhecido",
      });
    }
  },
  paymentConfirmedRoutine: (sale) => {
    mail.confirmation({
      name: sale.user.name,
      email: sale.user.email,
    });

    // let pageId = sale.page._id;
    // let planId = sale.plan._id;
    // let saleId = sale._id;
    // let modulesArray = sale.modules;

    // pagePlanSvc
    //   .getPagePlanBySale(saleId)
    //   .then((pagePlan) => {
    //     if (pagePlan == undefined) {
    //       if (sale.plan != undefined && sale.modules != undefined) {
    //         billSvc
    //           .getBillsOpenInProgressOrNotPaid(pageId)
    //           .then((bills) => {
    //             var amount_installment = sale.plan.price / sale.plan.period;
    //             var lastBill = bills[0];
    //             if (lastBill == undefined) {
    //               lastBill = {
    //                 start: moment().startOf("day"),
    //                 end: moment().endOf("day"),
    //               };
    //             }
    //             var promises_bills = [];
    //             var bills_end_plan = 0;
    //             if (bills.length > 0) {
    //               for (let i = 0; i < bills.length; i++) {
    //                 const bill = bills[i];
    //                 if (bill.end_plan) {
    //                   bills_end_plan++;
    //                   promises_bills.push(billSvc.updateBillEndPlan(bill));
    //                 } else {
    //                   promises_bills.push(
    //                     billSvc.updateToPaid(bill._id, amount_installment)
    //                   );
    //                 }
    //               }
    //             }

    //             // resto de bills
    //             var months = sale.plan.period;
    //             months = months - bills.length + bills_end_plan;
    //             for (let i = 1; i <= months; i++) {
    //               console.log(
    //                 moment(lastBill.end || moment())
    //                   .add(1, "days")
    //                   .add(i - 1, "month")
    //                   .format("DD/MM/YYYY"),
    //                 i,
    //                 moment(lastBill.end).add(i, "month").format("DD/MM/YYYY")
    //               );
    //               promises_bills.push(
    //                 billSvc.createBillPaid(
    //                   pageId,
    //                   moment(lastBill.end || moment())
    //                     .add(1, "days")
    //                     .add(i - 1, "month")
    //                     .toDate(),
    //                   moment(lastBill.end).add(i, "month").toDate(),
    //                   amount_installment
    //                 )
    //               );
    //             }

    //             Promise.all(promises_bills)
    //               .then((bills_paid) => {
    //                 var end = moment(lastBill.end).add(months, "month");
    //                 createBillService.createBillEndPlan(pageId, () => {
    //                   pagePlanSvc
    //                     .createPagePlan(
    //                       pageId,
    //                       planId,
    //                       saleId,
    //                       lastBill.start,
    //                       end,
    //                       bills_paid
    //                     )
    //                     .then(() => {})
    //                     .catch((err) => {
    //                       console.log(err);
    //                       Sentry.captureException(err);
    //                       throw new Error(
    //                         "Ocorreu um erro ao salvar o plano. " + err
    //                       );
    //                     });
    //                 });
    //               })
    //               .catch((err) => {
    //                 console.log(err);
    //                 Sentry.captureException(err);
    //                 throw new Error(
    //                   "Ocorreu um erro ao atualizar as bills. " + err
    //                 );
    //               });
    //             // no fim, cria uma bill em aberto que eu acho que não deveria
    //           })
    //           .catch((err) => {
    //             console.log(err);
    //             Sentry.captureException(err);
    //             throw new Error(
    //               "Ocorreu um erro ao buscar a bill aberta. " + err
    //             );
    //           });

    //         for (let i = 0; i < modulesArray.length; i++) {
    //           let modules = modulesArray[i].module._id;
    //           let price = modulesArray[i].value;
    //           pageModulesService
    //             .newPageModule(modules, pageId, price)
    //             .then(() => {})
    //             .catch((err) => {
    //               console.log(err);
    //               Sentry.captureException(err);
    //               res.json({
    //                 success: false,
    //                 message: err.message,
    //               });
    //             });
    //         }
    //       } else {
    //         throw new Error("Módulo ou plano não encontrado.");
    //       }
    //     }
    // })
    // .catch((err) => {
    //   console.log(err);
    //   Sentry.captureException(err);
    //   throw new Error(err);
    // });
  },
};
