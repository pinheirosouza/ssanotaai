var estrutura = new mongoose.Schema({
  page: { type: ObjectIDForModel, required: true, ref: "page" },
  plan: { type: ObjectIDForModel, required: false, ref: "plan" },
  user: { type: ObjectIDForModel, required: true, ref: "user" },
  establishment: {
    type: ObjectIDForModel,
    required: true,
    ref: "establishment",
  },
  max_parcel: { type: Number, required: false }, //número máximo de parcelas para pagamento com cartão
  value_plan: { type: Number, required: false },
  membershipFee: { type: Number, required: false },
  finished: { type: Boolean, required: false, default: false },
  discount: [
    {
      value: { type: Number, required: false },
      description: { type: String, required: false },
    },
  ],
  modules: [
    {
      module: { type: ObjectIDForModel, required: true, ref: "module" },
      value: { type: Number, required: false },
    },
  ],
  total: { type: Number, required: false },
  comments: { type: String, required: false },
  closer_name: { type: String, required: false },
  timezone: { type: String, required: false, default: "America/Sao_Paulo" },
  deleted: { type: Boolean, default: false },
});

module.exports = anotaai.model("sales", estrutura);
