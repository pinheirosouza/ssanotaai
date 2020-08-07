var estrutura = new mongoose.Schema({
  user: { type: ObjectIDForModel, required: true, ref: "user" },
  page: { type: ObjectIDForModel, required: true, ref: "page" },
  userRef: { type: String, required: false },
  id: { type: String, required: false },
  active: { type: Boolean, required: true },
  unitDefault: { type: ObjectIDForModel, ref: "establishmentUnit" },
});
estrutura.set("timestamps", true);
module.exports = anotaai.model("userRef", estrutura);
