var estrutura = new mongoose.Schema({
  page: { type: ObjectIDForModel, required: true, unique: false, ref: "page" },
  bill: { type: ObjectIDForModel, required: true, unique: false, ref: "bill" },
  status: { type: Number, required: true, default: 1 }, // 1 em aberto, 2 processando, 3 pago, 4 cancelado, 5 bloqueado para geração de boleto
  amount: { type: Number, required: true },
  amount_split_charged: { type: Number, default: 0 },
  type: { type: Number, required: true }, // 1 - ORDER, 2 - SETUP, 3 TAXA FIXA, 4 - REFERENCIA, 5 - MODULOS, 6 - ASSINATURA
  automatic_charge: { type: Boolean, required: true },
  transaction: {
    type: ObjectIDForModel,
    required: false,
    unique: false,
    ref: "transaction",
  },
});

estrutura.virtual("order", {
  ref: "order",
  localField: "_id",
  foreignField: "financialTransaction",
});

estrutura.set("toJSON", { virtuals: true });
estrutura.set("toObject", { virtuals: true });

estrutura.set("timestamps", true);
module.exports = anotaai.model("financialTransaction", estrutura);
