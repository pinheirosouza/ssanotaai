const planModel = require("../../../models/planModel");

module.exports = plansServices = {
  getPlanById: (plan) => {
    return planModel
      .findOne({
        _id: plan,
      })
      .exec();
  },

  getAllPlans:() =>{
      return planModel.find({}).exec()
  }
};