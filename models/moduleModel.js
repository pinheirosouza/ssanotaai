var estrutura = new mongoose.Schema({
    tag: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    base_price: {
        type: Number,
        required: true
    },
    advantages: [{
        type: String
    }],
    media: [{
        url: {type: String},
        type: {type: Number} //1- imagem 2- video
    }]
});

estrutura.plugin(mongoosePaginate);
estrutura.set('timestamps', true);

module.exports = anotaai.model('module', estrutura);