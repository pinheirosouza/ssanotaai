var estrutura = new mongoose.Schema({
  page: { type: ObjectIDForModel, required: true, unique: true, ref: "page" },
  greetings: {
    type: String,
    default: "Olá, Seja bem vindo ao nosso autoatendimento, vamos começar??",
  },
  review: {
    type: String,
    default:
      "Olá {username}, seu pedido ainda está em análise. Já já ele vai para cozinha 😜.",
  },
  production: {
    type: String,
    default:
      "Olá {username}, já estamos cortando os ingredientes do seu pedido 😋. Avisaremos quando ele estiver pronto.",
  },
  readydelivery: {
    type: String,
    default:
      "huummm 😋... Segura a fome aí {username}, seu pedido já saiu pra entrega 🚁.",
  },
  readytake: {
    type: String,
    default:
      "{username}, acabou a espera. Pode vir buscar seu pedido que ele já está pronto 😀.",
  },
  readyeat: {
    type: String,
    default: "{username} pode vir comer! seu pedido já está pronto 😀.",
  },
  sendmenu: {
    type: String,
    default:
      "Olá {username}, eu sou um garçom virtual e vou atender você agora 😉! Selecione uma das opções a seguir:",
  },
  orderok: {
    type: String,
    default:
      "Olá {username}, seu pedido foi realizado com sucesso. Vou te atualizando sobre o seu pedido por aqui 😜.",
  },
  buttonorder: { type: String, default: "Realizar pedido" },
  buttoninfo: { type: String, default: "Opções" },
  sorry_options: { type: String, default: "" },
  jobs: { type: String, default: "" },
  bookings: { type: String, default: "" },
  salutation: { type: String, default: "" },
  show_menu: { type: String, default: "" },
  messageMenuIntent: {
    facebook: {
      type: String,
      default:
        "Esse é o nosso atendimento virtual. Informe um número para o atendimento desejado, ou clique no link abaixo para fazer um pedido.",
    },
    whatsapp: {
      type: String,
      default:
        "Esse é o nosso atendimento virtual. Informe um número para o atendimento desejado, ou clique no link abaixo para fazer um pedido.",
    },
  },
  order: { type: String, default: "" },
  promotion: { type: String, default: "" },
  thank: { type: String, default: "" },
  help: { type: String, default: "" },
  feedback: { type: String, default: "" },
});

estrutura.set("timestamps", true);
module.exports = anotaai.model("message", estrutura);
