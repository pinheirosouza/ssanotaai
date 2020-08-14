const integratedSalesModel = require("../../../models/salesModel");

module.exports = salesServices = {
  /**
   * @name createSale - função responsável por criar uma nova venda
   *
   * @param {String} page - String referente a ID da página
   * @param {String} plan - String referente a ID do plano
   * @param {Number} max_parcel - Número referente a quantidade de parcelas no cartão de crédito
   * @param {Number} value_plan - Número referente ao valor do plano
   * @param {Number} membershipFee - String referente ao nome do estabelecimento
   * @param {Number} payment_method - Tipo de pagamento Boleto/Cartão
   * @param {Number} discount - Desconto dado
   * @param {String} status - String referente ao endereço do responsável/estabelecimento
   * @param {String} id_transaction - String referente ao endereço do responsável/estabelecimento
   * @param {String} comments - String referente ao endereço do responsável/estabelecimento
   * @param {String} token - String referente ao endereço do responsável/estabelecimento
   *
   *
   */
  createSale: (
    page,
    plan,
    establishment,
    user,
    max_parcel,
    membershipFee,
    //discount,
    modules,
    status,
    total,
    comments,
    closer_name
  ) => {
    return new Promise((resolve, reject) => {
      if (page) {
        const newSale = new integratedSalesModel({
          page,
          plan,
          establishment,
          user,
          max_parcel,
          membershipFee,
          //discount,
          modules,
          status,
          total,
          comments,
          closer_name,
          timezone: "America/Sao_Paulo",
        }).save();
        newSale
          .then((newSale) => {
            integratedSalesModel
              .findOne({
                _id: newSale._id,
              })
              .populate({ path: "plan" })
              .exec()
              .then((plan) => {
                resolve({ newSale: newSale, plan: plan });
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },

  /**
   * @name getSalebyId - retorna os dados de uma venda
   *
   * @param {String} saleId - String referente a ID da venda
   *
   * @returns {sale}
   *
   */
  getSaleById: (saleId) => {
    return integratedSalesModel
      .findOne({
        _id: saleId,
      })
      .populate({ path: "page", select: "nameId createdAt" })
      .populate({ path: "plan", select: "name title price period" })
      .populate({ path: "user", select: "name email address cpf phone" })
      .populate([
        {
          path: "modules",
          populate: { path: "module", populate: { path: "module" } },
        },
      ])
      .exec();
  },

  /**
   * @name updateSale - atualiza o banco após realizar um pagamento
   *
   * @param {String} saleId - String referente a ID da venda
   * @param {String} method - String metodo de pagamento - 1: boleto 2: cartão de crédito
   * @param {String} barcode - String contendo os números do código de barras
   * @param {String} cardNumber - String contendo os números do cartão de crédito
   * @param {String} status - Status da venda - 1: 2:
   * @param {String} id_transaction - Id da transação gerado pela safe2pay
   * @param {String} token - Token gerado pela safe2pay
   *
   *@returns {sale}
   */

  updateSale: (
    saleId,
    method,
    barcode,
    cardNumber,
    paymentLink,
    status,
    id_transaction,
    token
  ) => {
    return integratedSalesModel
      .findOneAndUpdate(
        {
          _id: saleId,
        },
        {
          "payment_method.method": method,
          "payment_method.barcode": barcode,
          "payment_method.cardNumber": cardNumber,
          "payment_method.paymentLink": paymentLink,
          status: status,
          id_transaction: id_transaction,
          token: token,
        },
        { new: true }
      )
      .exec();
  },
};
