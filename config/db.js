const DB_URI =
  "mongodb+srv://stagingbot_2:54RtGsfetrUso875sJENnb@cluster1.fccdc.mongodb.net/stagingbot?retryWrites=true&w=majority&wtimeoutMS=5000";
//"mongodb+srv://user-admin:pclNGWEhiDSE110j@cluster0.fb4gq.mongodb.net/anotaai?retryWrites=true&w=majority";

console.log("VERSAO::" + mongoose.version);

const connect = async () => {
  anotaai = mongoose.createConnection(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  return {
    anotaai,
  };
};

module.exports = {
  connect,
};
