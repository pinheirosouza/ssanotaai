var estrutura = new mongoose.Schema({
  sale: { type: ObjectIDForModel, required: true, ref: "sale" },
  page: { type: ObjectIDForModel, required: true, ref: "page" },
  status: { type: Number, required: false, default: 1 }, // 1 - venda criada, 2 - em processamento, 3 - pago,  4 - não pago
  history: [
    {
      status: { type: Number, required: false },
      date: { type: Date, required: false },
    },
  ],
  id_transaction: { type: String, required: true },
  token: { type: String, default: null },
  payment_method: {
    method: { type: String, required: false },
    cardName: { type: String, required: false },
    lastNumbers: { type: String, required: false },
    brand: { type: String, required: false },
    paymentLink: { type: String, required: false },
    barcode: { type: String, required: false },
    dueDate: { type: Date, required: false },
  },
});

module.exports = anotaai.model("eventsales", estrutura);
