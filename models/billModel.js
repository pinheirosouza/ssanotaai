var estrutura = new mongoose.Schema({
  page: { type: ObjectIDForModel, required: true, unique: false, ref: "page" },
  transactionCode: { type: String, required: false },
  numOrders: { type: Number, required: false, default: 0 },
  netAverage: { type: Number, required: false, default: 0 },
  overallAverage: { type: Number, required: false, default: 0 },
  totalDelivery: { type: Number, required: false, default: 0 },
  overallTotal: { type: Number, required: false, default: 0 },
  netTotal: { type: Number, required: false, default: 0 },
  totalBill: { type: Number, required: false, default: 0 },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  status: { type: Number, required: true, default: 1 }, // 1 - aberto, 2 - em processando, 3 - pago, 4 - não pago - 5 pronto pra gerar
  free: { type: Boolean, required: true, default: false },
  attempts: { type: Number, required: false, default: 0 },
  error: { type: String, required: false },
  paymentMethod: {
    method: { type: String, required: false },
    lastNumbers: { type: String, required: false },
    brand: { type: String, required: false },
    paymentLink: { type: String, required: false },
    barcode: { type: String, required: false },
    dueDate: { type: Date, required: false },
  },
  end_plan: { type: Boolean, required: false },
});

estrutura.virtual("orders", {
  ref: "order",
  localField: "_id",
  foreignField: "bill",
});

estrutura.virtual("establishment", {
  ref: "establishment",
  localField: "page",
  foreignField: "page",
});

estrutura.virtual("financialTransactions", {
  ref: "financialTransaction",
  localField: "_id",
  foreignField: "bill",
});

estrutura.virtual("nfse", {
  ref: "bill_nfse",
  localField: "_id",
  foreignField: "bill",
});

estrutura.set("toJSON", { virtuals: true });
estrutura.set("toObject", { virtuals: true });

estrutura.plugin(mongoosePaginate);
estrutura.set("timestamps", true);
module.exports = anotaai.model("bill", estrutura);
