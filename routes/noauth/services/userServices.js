const userModel = require("../../../models/userModel");

module.exports = userServices = {
  /**
   * @name getUserByEmail - Retorna os dados completos do user a aprtir do email
   *
   * @param {String} email - email de usuário
   *
   *@returns {User}
   */
  getUserByEmail: (email) => {
    if (email) {
      return userModel
        .findOne({
          email,
        })
        .exec();
    } else {
      return new Promise((resolve, reject) => {
        resolve(undefined);
      });
    }
  },
  /**
   * @name createUser - Retorna os dados completos do user a aprtir do email
   *
   * @param {String} name - nome de usuário
   * @param {String} email - email de usuário
   * @param {String} phone - telefone de usuário
   * @param {String} cpf - cpf de usuário
   * @param {String} birthDate - data de nascimento de usuário
   * @param {String} address - endereço do usuário
   *
   *@returns {newUser}
   */
  createUser: (name, email, phone, cpf, birthDate, address) => {
    return new Promise((resolve, reject) => {
      if (email && name) {
        email = email.toLowerCase();
        Promise.props({
          userWithEmail: userServices.getUserByEmail(email),
        })
          .then((info) => {
            if (info.userWithEmail != undefined) {
              reject("Já existe um usuário cadastrado com este Email!");
            } else {
              const newUser = new userModel({
                name,
                email,
                cpf,
                birthDate,
                address,
                phone: phone != undefined ? phone : null,
              }).save();

              resolve(newUser);
            }
          })
          .catch((e) => {
            console.log(e);
            reject(false);
          });
      } else {
        resolve(false);
      }
    });
  },
};
