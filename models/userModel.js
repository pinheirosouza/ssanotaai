var estrutura = new mongoose.Schema({
  id: { type: String, required: false },
  access_token: { type: String, required: false },
  name: { type: String, required: true },
  email: { type: String, required: false },
  agerange: { type: Number, required: false, default: null },
  gender: { type: String, default: null },
  cpf: { type: String, required: false },
  phone: { type: String, required: false },
  birthDate: { type: String, required: false },
  address: {
    street: { type: String, required: false },
    number: { type: String, required: false },
    complement: { type: String, required: false },
    district: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, required: false },
    postalCode: { type: String, required: false },
  },
  role: { type: String, required: false },
  username: { type: String, required: false },
  password: { type: String, required: false },
});
estrutura.set("timestamps", true);
module.exports = anotaai.model("user", estrutura);
