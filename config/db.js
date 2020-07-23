const DB_URI =
  "mongodb+srv://user-admin:pclNGWEhiDSE110j@cluster0.fb4gq.mongodb.net/<dbname>?retryWrites=true&w=majority";

module.exports = {
  connect: () => {
    return mongoose.createConnection(DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  },
};
