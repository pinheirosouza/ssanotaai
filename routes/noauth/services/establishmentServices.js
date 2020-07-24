const establishmentModel = require("../../../models/establishmentModel");

module.exports = establishmentServices = {
  /**
   * @name createEstablishment - cria estabelecimento
   *
   * @param {String} page - string referente a pageid criado anteriormente
   *  @param {String} formal_cpf_cnpj - string referente ao cpf ou cnpj do estabelecimento
   *  @param {String} formalEstablishmentName - Nome formal do estabelecimento
   *  @param {String} address - string referente ao endereço do estabelecimento
   *
   * @returns {Promise}
   */
  createEstablishment: (page) => {
    return new Promise((resolve, reject) => {
      if (page) {
        const newEstablishment = new establishmentModel({
          page,
          timezone: "America/Sao_Paulo",
        }).save();

        resolve(newEstablishment);
      } else {
        reject("Erro ao cadastrar Estabelecimento " + false);
      }
    });
  },
};
