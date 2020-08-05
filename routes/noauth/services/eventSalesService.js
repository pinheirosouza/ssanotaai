const eventSaleModel = require("../../../models/eventSalesModel");

module.exports = {
  /**
   * @name createSaleEvent - função responsável por criar um novo evento referente a uma venda
   *
   * @param {String} sale - Referencia a venda
   * @param {String} page - Referencia a página
   * @param {String} id_transaction - Id da transação retornada pelo safe2pay
   * @param {String} token - Token gerado pelo safe2pay
   * @param {String} payment_method - Objeto com os dados do pagamento
   *
   * @returns {Promise}
   */
  createSaleEvent: (sale, page, id_transaction, token, payment_method) => {
    return new Promise((resolve, reject) => {
      const newEvent = new eventSaleModel({
        sale,
        page,
        id_transaction,
        token,
        payment_method,
        status: 1,
        history: [
          {
            status: 1,
            date: new Date(),
          },
        ],
      }).save();
      newEvent
        .then((newEvent) => {
          resolve(newEvent);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  /**
   * @name updateSalveEventBySale - Atualiza o status conforme o retorno do safe2pay
   *
   * @param {String} sale - Referencia a venda
   * @param {Number} sell_status - Status da transação
   *
   * @returns {eventSale}
   */
  updateSalveEventBySale: (sale, sell_status) => {
    return eventSaleModel
      .findOneAndUpdate(
        {
          sale: sale,
        },
        {
          sell_status: sell_status,
        }
      )
      .exec();
  },
  /**
   * @name getEventBySale - Retorna um evento a partir da id da venda
   *
   * @param {String} sale - Referencia a venda
   *
   * @returns {eventSale}
   */
  getEventBySale: (sale) => {
    return eventSaleModel
      .findOne({
        sale: sale,
      })
      .exec();
  },
  countEventBySaleRealized: (saleId, isCreditCard) => {
    var filter = {
      sale: saleId
    }
    if (!isCreditCard){
      // caso for boleto, confere se já não existe algum ou o status já está como pago
      filter["$or"] = [{
        status: 3
      },{
        status: 1,
        "payment_method.method": 1,
        "payment_method.dueDate": {$gte: moment().toDate()}
      }]
    }
    else{
      filter.status = 3;
    }

    return eventSaleModel
      .count(filter)
      .exec();
  },
};