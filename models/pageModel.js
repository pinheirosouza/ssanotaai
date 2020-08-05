var estrutura = new mongoose.Schema({
  id: { type: String, required: false },
  name: { type: String, required: true },
  nameId: { type: String, required: false },
  category: { type: String, required: false },
  access_token: { type: String, required: false },
  callAttendantEnabled: { type: Boolean, default: false, required: false },
  acceptFeedback: { type: Boolean, default: true, required: false },
  startAlert: { type: Number, default: 0, required: false }, // 0 não executado, 1 realizado, 2 ignorado
  disablePassOrder: { type: Boolean, default: false },
  isOnline: { type: Boolean, default: false },
  orders_lost: {
    count: { type: Number },
    date: { type: Date },
  },
  whoDisabled: {
    user: { type: ObjectIDForModel, ref: "user" },
    date: { type: Date },
  },
  primaryNumberContact: { type: String },
  image: { type: String, required: false },
});
estrutura.set("timestamps", true);

estrutura.virtual("establishment", {
  ref: "establishment",
  localField: "_id",
  foreignField: "page",
  justOne: true,
});

estrutura.set("toJSON", { virtuals: true });
estrutura.set("toObject", { virtuals: true });

module.exports = anotaai.model("page", estrutura);
