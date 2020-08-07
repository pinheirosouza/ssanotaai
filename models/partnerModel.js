const bcryptjs = require('bcryptjs');

var estrutura = new mongoose.Schema({
	name: {type: String, required: true},
    cnpj: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    technical_manager: {type: String, required: true},
    config: {
        register_page: {type: Boolean, default: false},
        register_plan: {type: Boolean, default: false}
    }
});

estrutura.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcryptjs.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcryptjs.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

estrutura.methods.validPassword = function(password) {
    return bcryptjs.compareSync(password, this.password);
};
 
estrutura.plugin(mongoosePaginate);
estrutura.set('timestamps', true);
module.exports = anotaai.model('partner', estrutura);