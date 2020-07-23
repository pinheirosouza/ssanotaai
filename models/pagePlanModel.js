var estrutura = new mongoose.Schema({
  page: { type: ObjectIDForModel, required: true, unique: false, ref: "page" },
  plan: { type: ObjectIDForModel, required: true, unique: false, ref: "plan" },
  sale: { type: ObjectIDForModel, required: false, unique: false, ref: "sale" },
  bills: [
    { type: ObjectIDForModel, required: true, unique: false, ref: "bill" },
  ],
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  deleted: { type: Boolean, required: true, default: false },
});

estrutura.set("toJSON", { virtuals: true });
estrutura.set("toObject", { virtuals: true });

estrutura.set("timestamps", true);
module.exports = anotaai.model("page_plan", estrutura);
