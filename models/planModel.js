var estrutura = new mongoose.Schema({
  title: { type: String, required: false },
  timer: { type: Number, required: false },
  period: { type: Number, required: false },
  price: { type: Number, required: false },
  mat_icon: { type: String, required: false },
  description: [{ type: String, required: false }],
  createdAt: { type: Date, required: false },
  updatedAt: { type: Date, required: false },
  deleted: { type: Boolean, required: true, default: false },
  hide_on_integration: { type: Boolean, required: false, default: false },
});

estrutura.set("toJSON", { virtuals: true });
estrutura.set("toObject", { virtuals: true });

estrutura.set("timestamps", true);
module.exports = anotaai.model("plan", estrutura);
