var modulesModel = require("../../../models/moduleModel");

module.exports = modulesServices = {
  /**
   * @name getAll - Retorna todos os modulos disponíveis   *
   *
   * @returns {modules}
   */
  getAll: () => {
    return modulesModel.find();
  },
  /**
   * @name getModuleById - Retorna o módulo pela ID   *
   *
   * @returns {modules}
   */
  getModuleById: (moduleId) => {
    return modulesModel
      .findOne({
        _id: moduleId,
      })
      .exec();
  },
};
