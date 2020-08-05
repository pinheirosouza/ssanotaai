var estrutura = new mongoose.Schema({
  name: { type: String, required: true },
  page: { type: ObjectIDForModel, required: false, ref: "page" },
  timezone: { type: String, required: false, default: "America/Sao_Paulo" },
  exproductiontime: { type: Number, default: null }, // expectation tima of production in minutes
  time_delivery_min: { type: Number, default: null },
  time_delivery_max: { type: Number, default: null },
  time_take_min: { type: Number, default: null },
  time_take_max: { type: Number, default: null },
  order_automatic_on_production: {
    type: Boolean,
    required: false,
    default: false,
  },
  cpf_cnpj_on_order: { type: Boolean, required: false, default: false },
  zoop: {
    seller_id: { type: String },
    active: { type: Boolean, default: false },
  },
  safe2pay: {
    marketplace_token: { type: String },
    active: { type: Boolean, default: false },
  },
  address: {
    addressFormated: String,
    name: String,
    num: Number,
    neighborhood: String,
    complement: String,
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number], // need to be in this order <longitude>, <latitude>
    },
    postal_code: String,
    city: String,
    state: String,
    country: { type: String, default: "br" },
    placeId: { type: String, required: false },
    hided: { type: Boolean, default: false },
  },
  phones: [
    {
      type: { type: String, required: true }, //Home or Cel
      number: { type: String, required: true },
    },
  ],
  published: { type: Boolean, required: false, default: true },
  regions: [
    {
      idref: { type: String, required: false },
      external_id: { type: String, required: false },
      name: { type: String, required: true },
      price: { type: Number, dafault: 0, required: true },
      location: {
        type: { type: String, default: "Polygon" },
        coordinates: [[[Number]]], // need to be in this order <longitude>, <latitude>
      },
    },
  ],
  week: [
    {
      short_name: { type: String },
      schedules: [
        {
          start: { type: String },
          end: { type: String },
        },
      ],
    },
  ],
  is_always_open: { type: Boolean },
  is_permanently_closed: { type: Boolean },
  payment_method: {
    money: { type: Boolean, default: true },
    creditcard: { type: Boolean, default: false },
    question_card: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
  },
  acceptDelivery: { type: Boolean, default: true },
  acceptTake: { type: Boolean, default: true },
  acceptLocal: { type: Boolean, default: true },
  credit_cards: [
    {
      name: { type: String },
      external_id: { type: String },
    },
  ],
});

estrutura.set("timestamps", true);
module.exports = anotaai.model("establishmentUnit", estrutura);
