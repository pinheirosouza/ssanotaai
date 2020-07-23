var moment = require("moment-timezone");
var estrutura = new mongoose.Schema({
  page: { type: ObjectIDForModel, required: true, ref: "page" },
  units: [{ type: ObjectIDForModel, ref: "establishmentUnit" }],
  whatsapp: { type: String, required: false },
  whatsappSmartOptions: { type: Boolean, required: false, default: true },
  isGRFood: { type: Boolean, required: false, default: false },
  chargeByWhats: { type: Boolean, default: true },
  is_new_menu: { type: Boolean, default: false },
  timezone: { type: String, required: false, default: "America/Sao_Paulo" },
  webview: {
    hide_google_search: { type: Boolean },
    use_one_cep: { type: Boolean },
    group_itens: { type: Boolean },
    reference_point_required: { type: Boolean },
    address_manual: { type: Boolean, default: true },
    tag_manager: { type: String },
  },
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
  standard_delivery_price: { type: Number, dafault: 0 },
  delivery_price_km: { type: Number, dafault: 0 },
  minimum_order_amount: { type: Number, dafault: 0 },
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
  lastStepCompleted: { type: Number, dafault: 1 },
  sign: {
    fail: {
      bugRetry: { type: Boolean, required: false, default: false },
    },
    historyCodes: [String],
    businessModel: { type: Number, default: 1 }, // 1 - com teto, 2 - tabela regressiva
    date: { type: Date, required: false },
    manualPaymentDate: { type: Date, required: false },
    dateExpiration: {
      type: Date,
      required: true,
      default: moment().utc().add(30, "days").endOf("day").format(),
    },
    active: { type: Boolean, default: true },
    menu_released: {type:Boolean, default: false},
		date_activated: {type: Date, required: false},
		date_blocked: {type: Date, required: false},
		date_out: {type: Date, required: false},
    code: { type: String, required: false },
    email_invoice: { type: String, required: false },
    ip: { type: String, required: false },
    hash: { type: String, required: false },
    user: { type: ObjectIDForModel, ref: "user" },
    paymentMethod: {
      method: { type: String, default: "CREDITCARD" },
      lastNumbers: { type: Number, required: false },
      brand: { type: String, required: false },
    },
    cpf_cnpj: {
      type: { type: String },
      value: { type: String },
    },
    send_nfse: { type: Boolean, default: true },
  },
  config: {
    max: { type: Number, default: -1 },
    fee: { type: Number, default: 179.99 },
    min: { type: Number, default: -1 },
    percentage: { type: Number, default: 0 },
    fee_automatic_charge: { type: Boolean, default: false },
    order_automatic_charge: { type: Boolean, default: false },
    order_cancel_button: { type: Boolean, default: true },
    ungroup: {
      simple_items: { type: Boolean },
      complex_items: { type: Boolean },
    },
    alert_bill: { type: Boolean, default: true },
  },
  nfc: {
    active: { type: Boolean, default: false },
    empresaId: { type: String, required: false },
  },
  ncr: {
    apiKey: { type: String },
    url: { type: String },
    user: { type: String },
    password: { type: String },
    active: { type: Boolean, default: false },
  },
  integration: {
    active: { type: Boolean, default: false },
  },
  whatsappSetup: {
    user: { type: ObjectIDForModel, ref: "userRef" },
    dateActive: { type: Date, default: null },
  },
  zoop: {
    buyer_id: { type: String },
    seller_id: { type: String },
    brand: { type: String },
    first4_numbers: { type: String },
    active: { type: Boolean, default: false },
  },
  safe2pay: {
    token_card: { type: String },
    marketplace_token: { type: String },
    active: { type: Boolean, default: false },
  },
  logoUrl: { type: String },
  setup: {
    transaction: { type: String },
    status: { type: Number, default: 1 },
    payed: { type: Boolean, default: false },
  },
  typeBot: {
    facebook: {
      type: { type: Number, default: 2 },
      status: { type: Boolean, default: false },
    },
    whatsapp: {
      type: { type: Number, default: 2 },
      status: { type: Boolean, default: false },
    },
  },
  config_bot: {
    marketing: {
      coupon: { type: Boolean, default: false },
    },
  },
});

estrutura.virtual("targetsPage", {
  ref: "target",
  localField: "page",
  foreignField: "page",
});

estrutura.virtual("intentsBlock", {
  ref: "intentsBlock",
  localField: "page",
  foreignField: "page",
});

estrutura.virtual("intentsMenu", {
  ref: "intentsMenu",
  localField: "page",
  foreignField: "page",
});

estrutura.virtual("establishmentUnavailability", {
  ref: "establishmentUnavailability",
  localField: "page",
  foreignField: "page",
});

estrutura.set("toJSON", { virtuals: true });
estrutura.set("toObject", { virtuals: true });

estrutura.set("timestamps", true);
module.exports = anotaai.model("establishment", estrutura);
