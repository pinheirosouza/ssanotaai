var estrutura = new mongoose.Schema({
    module: {
        type: ObjectIDForModel,
        required: true,
        ref: 'module'
    },
    page: {
        type: ObjectIDForModel,
        required: true,
        ref: 'page'
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    price: {
        type: Number,
        required: true
    },
    signed_date: {
        type: Date,
        required: true
    },
    should_not_charge: {
        type: Boolean,
        required: false,
        default: false
    }
});

estrutura.plugin(mongoosePaginate);
estrutura.set('timestamps', true);

module.exports = anotaai.model('pagemodule', estrutura);